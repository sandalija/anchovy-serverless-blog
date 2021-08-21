"use strict";

import {
  listPosts,
  getPostById,
  createPost,
  deletePost,
} from "../models/posts";
import Response, { IResponse } from "../utils/response";

interface IPost {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Creates a post in DynamoDB
 * @param event Event received in lambda. See: https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html
 * @param context This object provides methods and properties that provide information about the invocation, function, and execution environment
 * See: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html
 * @param callback Lambda response
 */
// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const create = async (event: any): Promise<IResponse> => {
  try {
    const data = JSON.parse(event.body);
    if (typeof data.title !== "string" || typeof data.body !== "string") {
      const message = "Invalid shape";
      console.error(message);
      return Response.badRequest(message);
    }

    const post = {
      title: data.title,
      body: data.body,
    };

    const result: IPost = await createPost(post);
    return Response.success(result);
  } catch (e) {
    return Response.internalServerError(e.message);
  }
};

// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const readAll = async (event: any): Promise<IResponse> => {
  try {
    console.log("ENV: ", process.env.NODE_ENV);
    const data = await listPosts();
    return Response.success(data);
  } catch (e) {
    return Response.internalServerError(e.message);
  }
};

/**
 * Read a post in DynamoDB
 * @param event Event received in lambda. See: https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html
 * @param context See: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html
 * @param
 */
// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const read = async (event: any): Promise<IResponse> => {
  try {
    const postId = event.pathParameters.id;

    const data = await getPostById(postId);
    if (!data) return Response.notFound(`${postId} not found`);
    return Response.success(data);
  } catch (e) {
    return Response.internalServerError(e.message);
  }
};

/**
 * Delete a post in DynamoDB
 * @param event Event received in lambda. See: https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html
 * @param context See: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html
 * @param
 */
// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const remove = async (event: any): Promise<IResponse> => {
  try {
    const postId = event.pathParameters.id;
    console.log("ID:", postId);

    const data = await deletePost(postId);
    return Response.success(data);
  } catch (e) {
    return Response.internalServerError(e.message);
  }
};
