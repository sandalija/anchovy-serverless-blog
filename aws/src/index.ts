import { Context, Handler } from "aws-lambda";
import * as PostController from "./controllers/posts";
import * as CommentController from "./controllers/comments";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPost: Handler = (event: any, context: Context) => {
  console.log("Event", JSON.stringify(event, null, 2));
  console.log("Context", JSON.stringify(context, null, 2));
  return PostController.create(event);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findPosts: Handler = (event, context) => {
  console.log("Event", JSON.stringify(event, null, 2));
  console.log("Context", JSON.stringify(event, null, 2));
  PostController.readAll(event);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findOnePost: Handler = (event: any, context: Context) => {
  console.log("Event", JSON.stringify(event, null, 2));
  console.log("Context", JSON.stringify(context, null, 2));
  return PostController.read(event);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removePost: Handler = (event: any, context: Context) => {
  console.log("Event", JSON.stringify(event, null, 2));
  console.log("Context", JSON.stringify(context, null, 2));
  return PostController.remove(event);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createComment: Handler = (event: any, context: Context) => {
  console.log("Event", JSON.stringify(event, null, 2));
  console.log("Context", JSON.stringify(context, null, 2));
  return CommentController.create(event);
};
