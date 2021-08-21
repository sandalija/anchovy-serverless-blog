import DynamoDB, { COMMENTS_TABLE } from "../services/DynamoDB";
import { getPostById } from "./posts";

const CURRENT_TABLE = COMMENTS_TABLE;

interface IComment {
  [key: string]: unknown;
}

/**
 * Comments uses a Dynamo DB composite primary key. It is composed by
 * - partition key (same key used in Items)
 * - sort key
 *
 *  It allows that two comments has the same partition key. So, partition key
 *  is the Post partition key and sort date is a random key
 */

export const createComment = async (
  item: IComment,
  postId: string | number
): Promise<AWS.DynamoDB.DocumentClient.AttributeMap> => {
  const timestamp = new Date().getTime();
  const id = `${timestamp}-${Math.floor(Math.random() * 1000)}`;
  console.log("ID: ", id, "Post:", postId);
  const itemSanitized = {
    id,
    postId,
    body: item.body,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const params = {
    TableName: CURRENT_TABLE,
    Item: itemSanitized,
  };

  // verify that the post exists
  const post = await getPostById(postId);
  if (!post) throw Error("Post not found");
  console.log("READED posts", post);

  await DynamoDB.put(params).promise();
  console.log("Comment added");

  const result = await getComment(postId, id);
  return result;
};

export const getComment = async (
  postId: string | number,
  commentId: string
): Promise<IComment> => {
  const params = {
    TableName: CURRENT_TABLE,
    Key: { postId, id: commentId },
  };
  const data = await DynamoDB.get(params).promise();
  const result: IComment = data.Item;
  return result;
};
