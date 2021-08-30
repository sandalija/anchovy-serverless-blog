import escapeHTML from "escape-html";
import Response from "../utils/response";
import { createComment, deleteComment } from "../models/comments";
import { IResponse } from "../utils/response";
import { getPostById } from "../models/posts";

const trustedParams = ["body"];

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

    // validate request
    const data = JSON.parse(event.body);
    if (typeof data.body !== "string") {
      const message = "Invalid shape";
      console.error(message);
      return Response.badRequest(message);
    }

    // verify that the post exists
    const post = await getPostById(postId);
    if (!post) return Response.badRequest("Post not found");

    //sanitize
    Object.keys(data).forEach((key) => {
      if (!trustedParams.includes(key)) delete data[key];
      else data[key] = escapeHTML(data[key]);
    });
    const comment = {
      body: data.body,
    };

    // call to model
    const result = await createComment(comment, postId);

    return Response.created(result);
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
export const remove = async (event: any): Promise<IResponse> => {
  console.log(event);
  try {
    const postId = event.pathParameters.postId;
    const commentId = event.pathParameters.commentId;
    console.log("Post ID:", postId, "comment id", commentId);

    const result = await deleteComment(commentId, postId);
    return Response.success({ status: result });
  } catch (e) {
    return Response.internalServerError(e.message);
  }
};
