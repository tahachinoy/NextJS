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
      AuthParameters: { USERNAME: username, PASSWORD: password },
    });
    return cognitoClient.send(cmd);
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