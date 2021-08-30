import escapeHTML from "escape-html";

export interface IResponse {
  headers: Record<string, string>;
  statusCode: number;
  error?: string | Error;
  body: string; // Http API response bust me stringllifable
}

const sanitizeResponse = (data) => {
  if (typeof data === "object") {
    Object.keys(data).forEach((field) => {
      if (typeof data[field] === "string") {
        data[field] = escapeHTML(data[field]);
      }
      if (typeof data[field] === "object") {
        sanitizeResponse(data[field]);
      }
      if (Array.isArray(data[field])) {
        data[field].forEach((position) => {
          sanitizeResponse[position];
        });
      }
    });
  } else if (typeof data === "string") {
    data = { message: escapeHTML(data) };
  }
  return data;
};

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
      body: JSON.stringify(sanitizeResponse(data)),
    };
  };

  static notFound = (message = "Not found", log = true): IResponse => {
    return Response.response(404, log, message);
  };

  static success = (data: unknown, log = true): IResponse => {
    return Response.response(200, log, data);
  };

  static created = (data: unknown, log = true): IResponse => {
    return Response.response(201, log, data);
  };

  static badRequest = (data: unknown, log = true): IResponse => {
    return Response.response(400, log, data);
  };

  static internalServerError = (data: unknown, log = true): IResponse => {
    return Response.response(500, log, data);
  };
}

export default Response;
