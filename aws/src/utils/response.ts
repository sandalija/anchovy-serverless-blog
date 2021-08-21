export interface IResponse {
  headers: Record<string, string>;
  statusCode: number;
  error?: string | Error;
  body: string; // Http API response bust me stringllifable
}

class Response {
  static response = (code: number, log: boolean, data: unknown): IResponse => {
    if (log && data) {
      if (code >= 300) console.error(data);
      else console.log(data);
    }
    // AWS Lambda response must be compatible with JSON.stringify
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: code,
      body: JSON.stringify(data),
    };
  };

  static notFound = (message = "Not found", log = true): IResponse => {
    return Response.response(404, log, message);
  };

  static success = (data: unknown, log = true): IResponse => {
    return Response.response(200, log, data);
  };

  static badRequest = (data: unknown, log = true): IResponse => {
    return Response.response(400, log, data);
  };

  static internalServerError = (data: unknown, log = true): IResponse => {
    return Response.response(500, log, data);
  };
}

export default Response;
