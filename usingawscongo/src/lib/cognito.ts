import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  GlobalSignOutCommand
} from "@aws-sdk/client-cognito-identity-provider";

const REGION = process.env.NEXT_PUBLIC_COGNITO_REGION!;
const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;

export const cognitoClient = new CognitoIdentityProviderClient({
  region: REGION,
});

// const getRedirectUri = () => {
//   return process.env.NODE_ENV === 'production'
//     ? `https://${process.env.VERCEL_URL}/callback` // For production (Vercel)
//     : "http://localhost:3000/callback"; // For local development
// };

// export function getRedirectUri() {
//   if (process.env.NODE_ENV === "production") {
//     // In production, use the Vercel URL
//     return `https://awscognitogoogleandmicrosft-d0irrd7m4-tahachinoys-projects.vercel.app/callback`;
//   } else {
//     // In development, use localhost
//     return "http://localhost:3000/callback";
//   }
// }


export async function signUp(username: string, password: string, email: string) {
  const cmd = new SignUpCommand({
    ClientId: CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: [{ Name: "email", Value: email }],
  });
  return cognitoClient.send(cmd);
}

export async function confirmSignUp(username: string, code: string) {
  const cmd = new ConfirmSignUpCommand({
    ClientId: CLIENT_ID,
    Username: username,
    ConfirmationCode: code,
  });
  return cognitoClient.send(cmd);
}

export async function signIn(username: string, password: string) {
  const cmd = new InitiateAuthCommand({
    ClientId: CLIENT_ID,
    AuthFlow: "USER_PASSWORD_AUTH",
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      
    },
  });
  const resp = await cognitoClient.send(cmd);
  return resp; 

}

export async function forgotPassword(username: string) {
  const cmd = new ForgotPasswordCommand({
    ClientId: CLIENT_ID,
    Username: username,
  });
  return cognitoClient.send(cmd);
}

export async function confirmPassword(username: string, code: string, newPassword: string) {
  const cmd = new ConfirmForgotPasswordCommand({
    ClientId: CLIENT_ID,
    Username: username,
    ConfirmationCode: code,
    Password: newPassword,
  });
  return cognitoClient.send(cmd);
}

export async function signOut(accessToken: string) {
  const cmd = new GlobalSignOutCommand({ AccessToken: accessToken });
  return cognitoClient.send(cmd);
}

export async function exchangeAuthCode(code: string) {
  // const redirectUri = "http://localhost:3000/callback";

  // const redirectUri = getRedirectUri();
  const redirectUri = "https://awscognitogoogleandmicrosft-d0irrd7m4-tahachinoys-projects.vercel.app/callback"; 
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
    code,
    redirect_uri: redirectUri,
  });

  const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN!;
  const region = process.env.NEXT_PUBLIC_COGNITO_REGION!;
  const url = `https://${domain}.auth.${region}.amazoncognito.com/oauth2/token`;

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!resp.ok) {
    const errorText = await resp.text();
    console.error("Token exchange failed:", errorText);
    throw new Error("Token exchange failed");
  }

  return resp.json();
}
