import Response from "../utils/response";
import { createComment } from "../models/comments";
import { IResponse } from "../utils/response";

/**
 * Creates a comment in a post in DynamoDB
 * @param event Event received in lambda. See: https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html
 * @param context This object provides methods and properties that provide information about the invocation, function, and execution environment
 * See: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html
 * @param callback Lambda response
 */
// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const create = async (event: any): Promise<IResponse> => {
  console.log(event);
  try {
    const postId = event.pathParameters.postId;
    console.log("ID:", postId);

    const data = JSON.parse(event.body);
    if (typeof data.body !== "string") {
      const message = "Invalid shape";
      console.error(message);
      return Response.badRequest(message);
    }

    const comment = {
      body: data.body,
    };

    const result = await createComment(comment, postId);
    return Response.success(result);
  } catch (e) {
    return Response.internalServerError(e.message);
  }
};

/**
 * Creates a comment in a post in DynamoDB
 * @param event Event received in lambda. See: https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html
 * @param context This object provides methods and properties that provide information about the invocation, function, and execution environment
 * See: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html
 * @param callback Lambda response
 */
// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const deleteComment = async (event: any): Promise<IResponse> => {
  console.log(event);
  try {
    const postId = event.pathParameters.postId;
    console.log("ID:", postId);

    const data = JSON.parse(event.body);
    if (typeof data.body !== "string") {
      const message = "Invalid shape";
      console.error(message);
      return Response.badRequest(message);
    }

    const comment = {
      body: data.body,
    };

    const result = await createComment(comment, postId);
    return Response.success(result);
  } catch (e) {
    return Response.internalServerError(e.message);
  }
};
