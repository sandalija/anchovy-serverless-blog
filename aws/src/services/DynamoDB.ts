import AWS from "aws-sdk";
import { ServiceConfigurationOptions } from "aws-sdk/lib/service";

const localConfig: ServiceConfigurationOptions = {
  endpoint: "http://localhost:8000",
  region: "local",
};

// Connect to local Dynamo if is running serverless-offline
if (process.env.IS_OFFLINE) AWS.config.update(localConfig);

/**
 * Dynamo DB Client
 */
const DynamoDB = new AWS.DynamoDB.DocumentClient();

const suffix = process.env.NODE_ENV === "production" ? "prod" : "dev";
export const POSTS_TABLE = `${suffix}-anchovy-posts`;
export const COMMENTS_TABLE = `${suffix}-anchovy-comments`;
export const USERS_TABLE = `${suffix}-anchovy-users`;

export default DynamoDB;
