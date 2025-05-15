// 'use client';

// import { useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function CallbackHandler() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     const code = searchParams.get("code");
//     if (!code) {
//       router.replace("/");
//       return;
//     }

//     const exchangeCode = async () => {
//       try {
//         const res = await fetch(`/api/auth/callback?code=${code}`);
//         if (res.ok) {
//           router.replace("/welcome");
//         } else {
//           router.replace("/");
//         }
//       } catch (err) {
//         console.error("OAuth error:", err);
//         router.replace("/");
//       }
//     };

//     exchangeCode();
//   }, [router, searchParams]);

//   return null;
// }


'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'error' | 'done'>('loading');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) {
      router.replace("/");
      return;
    }

    const exchangeCode = async () => {
      setStatus('loading');
      try {
        const res = await fetch(
          `/api/auth/callback?code=${encodeURIComponent(code)}`
        );
        if (res.ok) {
          setStatus('done');
          router.replace("/welcome");
        } else {
          const data = await res.json();
          setErrorMsg(data.error || 'Authentication failed');
          setStatus('error');
        }
      } catch (err: any) {
        console.error("OAuth error:", err);
        setErrorMsg(err.message || 'Network error');
        setStatus('error');
      }
    };

    exchangeCode();
  }, [router, searchParams]);

  if (status === 'loading') {
    return <div>Loading authentication...</div>;
  }

  if (status === 'error') {
    return <div>Error: {errorMsg}</div>;
  }

  return null;
}