//old file when this was route.ts
// import { NextResponse } from "next/server";
// import { serialize } from "cookie";
// import { exchangeAuthCode } from "@/lib/cognito";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const code = searchParams.get("code");
//   if (!code) return NextResponse.redirect(new URL("/", req.url));

//   try {
//     const tokens = await exchangeAuthCode(code);
//     const cookie = serialize("accessToken", tokens.access_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//       maxAge: tokens.expires_in,
//     });
//     const res = NextResponse.redirect(new URL("/welcome", req.url));
//     res.headers.set("Set-Cookie", cookie);
//     return res;
//   } catch (err) {
//     console.error("OAuth callback error:", err);
//     return NextResponse.redirect(new URL("/", req.url));
//   }
// }

'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      router.replace("/");
      return;
    }

    const exchangeCode = async () => {
      try {
        const res = await fetch(`/api/auth/callback?code=${code}`);
        if (res.ok) {
          router.replace("/welcome");
        } else {
          router.replace("/");
        }
      } catch (err) {
        console.error("OAuth error:", err);
        router.replace("/");
      }
    };

    exchangeCode();
  }, [router, searchParams]);
}
