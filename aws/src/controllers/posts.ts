"use strict";

import escapeHTML from "escape-html";
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

const trustedParams = ["title", "body"];

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
    if (!event.body) return Response.badRequest("Missing body");

    const data = JSON.parse(event.body);

    // Validate request
    if (typeof data.title !== "string") {
      const message = "Invalid shape";
      console.error(message);
      return Response.badRequest(message);
    }

    // sanitize
    Object.keys(data).forEach((key) => {
      if (!trustedParams.includes(key)) delete data[key];
      else data[key] = escapeHTML(data[key]);
    });
    const post = {
      title: data.title,
      ...data,
    };

    // call to model
    const result: IPost = await createPost(post);

    return Response.created(result);
  } catch (e) {
    console.error(e);
    return Response.internalServerError(e.message);
  }
};

/**
 * Get a list of all post in Dynamo
 * @todo implement pagination
 * @param event Event received in lambda. See: https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html
 * @returns IResponse
 */
// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const readAll = async (event: any): Promise<IResponse> => {
  console.log(event);
  try {
    const data = await listPosts();
    return Response.success(data);
  } catch (e) {
    console.error(e);
    return Response.internalServerError(e.message);
  }
};

/**
 * Read a post in DynamoDB
 * @param event Event received in lambda. See: https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html
 */
// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const read = async (event: any): Promise<IResponse> => {
  console.log(event);
  try {
    const postId = event.pathParameters.id;

    const data = await getPostById(postId);
    if (!data) return Response.notFound(`Post not found`);
    return Response.success(data);
  } catch (e) {
    console.error(e);
    return Response.internalServerError(e.message);
  }
};

/**
 * Delete a post in DynamoDB
 * @param event Event received in lambda. See: https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html
 */
// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const remove = async (event: any): Promise<IResponse> => {
  try {
    const postId = event.pathParameters.id;
    console.log("ID:", postId);

    const data = await deletePost(postId);
    if (!data) return Response.notFound("Post not found");
    return Response.success(data);
  } catch (e) {
    console.error(e);
    return Response.internalServerError(e.message);
  }
};
