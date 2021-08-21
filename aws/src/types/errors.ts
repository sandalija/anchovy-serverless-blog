import Response, { IResponse } from "../utils/response";

const AlreadyExistingItemErrorName = "AlreadyExistingItem";
const InvalidShapeErrorName = "AlreadyExistingItem";

export class AlreadyExistingItemError extends Error {
  constructor(message: string) {
    super(message);
    this.name = AlreadyExistingItemErrorName;
  }
}

export class InvalidShapeErrorNameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = InvalidShapeErrorName;
  }
}

export const handleErrors = (e: Error): IResponse => {
  if (e.name === AlreadyExistingItemErrorName)
    return Response.badRequest(e.message);
  return Response.internalServerError(e.message);
};
