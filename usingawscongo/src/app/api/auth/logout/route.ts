// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { serialize } from "cookie";
// import { signOut } from "@/lib/cognito";

// export async function GET(req: Request) {
//   const cookieStore = cookies();
//   const token = cookieStore.get("accessToken")?.value;

//   const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN!;
//   const region = process.env.NEXT_PUBLIC_COGNITO_REGION!;
//   const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;
//   const redirectUri = "http://localhost:3000/"; 

  
//   if (!token) {
//     const res = NextResponse.redirect(redirectUri);
//     res.headers.set("Set-Cookie", serialize("accessToken", "", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//       expires: new Date(0),
//     }));
//     return res;
//   }

//   const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

//   const isFederated = payload.identities || payload['cognito:identity_provider']?.startsWith("Google");

//   if (isFederated) {
    
//     const logoutUrl = `https://${domain}.auth.${region}.amazoncognito.com/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(redirectUri)}`;
//     const res = NextResponse.redirect(logoutUrl);
//     res.headers.set("Set-Cookie", serialize("accessToken", "", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//       expires: new Date(0),
//     }));
//     return res;
//   } else {
    
//     try {
//       await signOut(token);
//     } catch (e) {
//       console.error("Global sign out failed:", e);
//     }

//     const res = NextResponse.redirect(redirectUri);
//     res.headers.set("Set-Cookie", serialize("accessToken", "", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//       expires: new Date(0),
//     }));
//     return res;
//   }
// }


import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { serialize } from "cookie";
import { signOut } from "@/lib/cognito";

export async function GET() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;

  const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN!;
  const region = process.env.NEXT_PUBLIC_COGNITO_REGION!;
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;
  // const redirectUri = "http://localhost:3000/";
  // const redirectUri = process.env.NODE_ENV === 'production'
  // ? `https://https://awscognitogoogleandmicrosft-d0irrd7m4-tahachinoys-projects.vercel.app/`  // Vercel domain for production
  // : "http://localhost:3000/"; 

  const redirectUri = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI!;



  if (!token) {
    const res = NextResponse.redirect(redirectUri);
    res.headers.set("Set-Cookie", serialize("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    }));
    return res;
  }

  const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

  const isFederated = payload.identities || payload['cognito:identity_provider']?.startsWith("Google");

  if (isFederated) {
    const logoutUrl = `https://${domain}.auth.${region}.amazoncognito.com/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(redirectUri)}`;
    const res = NextResponse.redirect(logoutUrl);
    res.headers.set("Set-Cookie", serialize("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    }));
    return res;
  } else {
    try {
      await signOut(token);
    } catch (e) {
      console.error("Global sign out failed:", e);
    }

    const res = NextResponse.redirect(redirectUri);
    res.headers.set("Set-Cookie", serialize("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    }));
    return res;
  }
}