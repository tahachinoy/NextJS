// import { NextResponse } from "next/server";
// import { serialize } from "cookie";
// import { exchangeAuthCode } from "@/lib/cognito";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const code = searchParams.get("code");

//   if (!code) {
//     return NextResponse.json({ error: "Missing code" }, { status: 400 });
//   }

//   try {
//     const tokens = await exchangeAuthCode(code);

//     const cookie = serialize("accessToken", tokens.access_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//       maxAge: 3600, // 1 hour or as per your token expiry
//     });

//     const res = NextResponse.json({ success: true });
//     res.headers.set("Set-Cookie", cookie);
//     return res;

//   } catch (err) {
//     console.error("Token exchange failed:", err);
//     return NextResponse.json({ error: "Token exchange failed" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { exchangeAuthCode } from "@/lib/cognito";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  console.log("Callback received with code:", code);

  if (!code) {
    console.error("Missing code parameter in callback");
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  try {
    const tokens = await exchangeAuthCode(code);
    console.log("Token exchange successful:", tokens);

    const cookie = serialize("accessToken", tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: tokens.expires_in || 3600, // Default to 1 hour if expires_in is missing
    });

    const res = NextResponse.json({ success: true });
    res.headers.set("Set-Cookie", cookie);
    return res;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error("Token exchange failed:", errorMessage);
    return NextResponse.json({ error: "Token exchange failed", details: errorMessage }, { status: 500 });
  }
}