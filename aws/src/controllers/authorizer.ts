import * as Axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import * as Authorizer from "../types/interfaces/Authorization";
import { APIGatewayAuthorizerResult } from "aws-lambda";

const cognitoPoolId = "eu-west-1_zyRD7oszn";
const cognitoRegion = "eu-west-1";
const cognitoIssuer = `https://cognito-idp.${cognitoRegion}.amazonaws.com/${cognitoPoolId}`;

const verifyAuthorizationToken = async (
  authorizationToken: string
): Promise<JwtPayload | string> => {
  const tokenSections = authorizationToken.split(".");

  if (tokenSections.length < 2) {
    throw new Error("requested token is invalid");
  }
  const headerJSON = Buffer.from(tokenSections[0], "base64").toString("utf8");
  const header = JSON.parse(headerJSON);
  const keys = await getPublicKeys();
  const key = keys[header.kid];
  if (key === undefined) {
    throw new Error("claim made for unknown kid");
  }
  const decoded = jwt.verify(authorizationToken, key.pem);
  return decoded;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const allowAdmin = (decodedJwt: JwtPayload | string): boolean => {
  return (
    decodedJwt["cognito:groups"].includes("admin") &&
    decodedJwt["token_use"] === "access"
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const handlerPost = async (event, context, callback): Promise<void> => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  console.log("Current context:", JSON.stringify(context, null, 2));

  const authHeader = event.headers.authorization;

  const resultPolicy = await handleAuthorization(authHeader, event.routeArn);
  callback(null, resultPolicy);
};

const handleAuthorization = async (
  authHeader: string,
  lambdaArn: string
): Promise<APIGatewayAuthorizerResult> => {
  const denyPolicy = generateDeny("me", lambdaArn);
  try {
    console.log("Authorizating for ", authHeader);
    if (authHeader) {
      const decoded = await verifyAuthorizationToken(authHeader);
      console.log("Decoded token: ", decoded);

      if (allowAdmin(decoded)) {
        console.log("Allowed request");
        return generateAllow("me", lambdaArn);
      }
    }
    return denyPolicy;
  } catch (e) {
    console.error("CANNOT AUTH", e);
    return generateDeny("me", lambdaArn);
  }
};

const getPublicKeys = async (): Promise<Authorizer.MapOfKidToPublicKey> => {
  const url = `${cognitoIssuer}/.well-known/jwks.json`;
  const publicKeys = await Axios.default.get<Authorizer.PublicKeys>(url);
  const keys = publicKeys.data.keys.reduce((agg, current) => {
    const pem = jwkToPem(current);
    agg[current.kid] = { instance: current, pem };
    return agg;
  }, {} as Authorizer.MapOfKidToPublicKey);
  return keys;
};

// Help function to generate an IAM policy
const generatePolicy = (
  principalId,
  effect,
  resource
): APIGatewayAuthorizerResult => {
  // Required output:
  const authResponse: APIGatewayAuthorizerResult = {
    principalId,
    policyDocument: {
      Version: "2012-10-17", // default version
      Statement: [
        {
          Action: "execute-api:Invoke", // default action
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };

  return authResponse;
};

const generateAllow = (principalId, resource): APIGatewayAuthorizerResult => {
  return generatePolicy(principalId, "Allow", resource);
};

const generateDeny = (principalId, resource): APIGatewayAuthorizerResult => {
  return generatePolicy(principalId, "Deny", resource);
};
