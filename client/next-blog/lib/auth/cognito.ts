import { promisify } from "util";
import * as Axios from "axios";
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import { Session } from "../types/Session";
import { decode } from "punycode";

export interface ClaimVerifyRequest {
  readonly token?: string;
}

export interface ClaimVerifyResult {
  readonly userName: string;
  readonly clientId: string;
  readonly isValid: boolean;
  readonly error?: any;
}

interface TokenHeader {
  kid: string;
  alg: string;
}
interface PublicKey {
  alg: string;
  e: string;
  kid: string;
  kty: string;
  n: string;
  use: string;
}
interface PublicKeyMeta {
  instance: PublicKey;
  pem: string;
}

interface PublicKeys {
  keys: PublicKey[];
}

interface MapOfKidToPublicKey {
  [key: string]: PublicKeyMeta;
}

interface Claim {
  token_use: string;
  auth_time: number;
  iss: string;
  exp: number;
  username: string;
  client_id: string;
}

const cognitoPoolId = process.env.NEXT_PUBLIC_COGNITO_POOL_ID || "";
const cognitoRegion = process.env.NEXT_PUBLIC_COGNITO_POOL_REGION || "";
console.log("POOL ID", cognitoPoolId);

const cognitoIssuer = `https://cognito-idp.${cognitoRegion}.amazonaws.com/${cognitoPoolId}`;
console.log(cognitoIssuer);

let cacheKeys: MapOfKidToPublicKey | undefined;
const getPublicKeys = async (): Promise<MapOfKidToPublicKey> => {
  if (!cacheKeys) {
    const url = `${cognitoIssuer}/.well-known/jwks.json`;
    const publicKeys = await Axios.default.get<PublicKeys>(url);
    cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
      const pem = jwkToPem(current);
      agg[current.kid] = { instance: current, pem };
      return agg;
    }, {} as MapOfKidToPublicKey);
    return cacheKeys;
  } else {
    return cacheKeys;
  }
};

export const decodeToken = async (token): Promise<any> => {
  console.log("DECODING...");
  const tokenSections = token.split(".");

  if (tokenSections.length < 2) {
    throw new Error("requested token is invalid");
  }
  const headerJSON = Buffer.from(tokenSections[0], "base64").toString("utf8");
  console.log("Header", headerJSON);

  const header = JSON.parse(headerJSON) as TokenHeader;
  const keys = await getPublicKeys();
  console.log("Getted keys");
  const key = keys[header.kid];
  if (key === undefined) {
    throw new Error("claim made for unknown kid");
  }
  const decoded = jwt.verify(token, key.pem);
  console.log(decoded);
  return decoded;
};
