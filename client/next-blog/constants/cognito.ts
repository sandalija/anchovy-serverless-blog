export const COGNITO_LOGIN = `https://${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}.auth.${process.env.NEXT_PUBLIC_COGNITO_POOL_REGION}.amazoncognito.com/login?client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT}&response_type=token&scope=email+openid&redirect_uri=http://localhost:3000/auth/token`;

export const COGNITO_LOGOUT = `https://${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}.auth.${process.env.NEXT_PUBLIC_COGNITO_POOL_REGION}.amazoncognito.com/logout?client_id=${process.env.NEXT_PUBLIC_COGNITO_CLIENT}&logout_uri=${process.env.NEXT_PUBLIC_CURRENT_URL}`;

export const cognitoTokens = ["id_token", "access_token"];
