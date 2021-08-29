import DynamoDB, { COMMENTS_TABLE, POSTS_TABLE } from "../services/DynamoDB";
import { v4 as uuidv4 } from "uuid";
import IPost from "../types/interfaces/IPost";
import IComment from "../types/interfaces/IComment";
import { toKebabCase } from "../utils/strings";
import {
  AlreadyExistingItemError,
  InvalidShapeErrorNameError,
} from "../types/errors";

const CURRENT_TABLE = POSTS_TABLE;

/**
 * Get a list of all posts
 * @todo Scan doesn't sort the results
 * @returns A list of posts
 */
export const listPosts = async (): Promise<IPost[]> => {
  const params = {
    TableName: CURRENT_TABLE,
  };
  const data = await DynamoDB.scan(params).promise();
  const result: IPost[] = [];
  data.Items?.forEach((item) => {
    result.push({
      body: item.body.toString(),
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      title: item.title,
      id: item.id,
    });
  });
  return result;
};

/**
 * Create a post in DynamoDB
 * @param post (IPost) Post to create
 * @returns The created post
 */
export const createPost = async (post: IPost): Promise<IPost> => {
  const timestamp = new Date().getTime();
  const id = uuidv4();
  const urlSegment = `${toKebabCase(post.title)}-${id}`;
  if (!post.title) throw new InvalidShapeErrorNameError("Missing title");
  const itemSanitized = {
    id,
    urlSegment, // to create SEO friendly ids
    ...post,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const params = {
    TableName: CURRENT_TABLE,
    Item: itemSanitized,
  };

  /* // TODO: change to kebab + uuid. It is causing an error
  if (getPost({ urlSegment }))
    throw new AlreadyExistingItemError("Already exists"); */

  await DynamoDB.put(params).promise();
  console.log("created post");
  const result: IPost = await getPostById(id);
  return result;
};

export const getPostById = async (postId: string | number): Promise<IPost> => {
  const keys: AWS.DynamoDB.DocumentClient.AttributeValue = { id: postId };
  return getPost(keys);
};

export const getPost = async (
  keys: AWS.DynamoDB.DocumentClient.AttributeValue
): Promise<IPost> => {
  const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
    TableName: CURRENT_TABLE,
    Key: keys,
  };
  console.log(params);
  const data: AWS.DynamoDB.DocumentClient.GetItemOutput = await DynamoDB.get(
    params
  ).promise();
  console.log("DATA", data);
  if (!data.Item) return null;
  const comments: IComment[] = await getPostsComment(data.Item.postId);
  const result: IPost = {
    title: data.Item.title,
    body: data.Item.body,
    comments,
  };
  return result;
};

export const deletePost = async (postId: string): Promise<string> => {
  const params = {
    TableName: CURRENT_TABLE,
    Key: {
      id: postId,
    },
  };

  await DynamoDB.delete(params).promise();
  return "Deleted post " + postId;
};

export const getPostsComment = async (postId: string): Promise<IComment[]> => {
  const params = {
    TableName: COMMENTS_TABLE,
    Key: { postId },
  };

  const data = await DynamoDB.scan(params).promise();
  console.log(data);
  const result: IComment[] = [];
  data.Items?.forEach((item) => {
    result.push({
      body: item.body.toString(),
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      postId: item.postId,
      id: item.id,
    });
  });

  return result;
};
