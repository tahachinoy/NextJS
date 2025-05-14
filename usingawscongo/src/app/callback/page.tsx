import { Suspense } from "react";
import CallbackHandler from "./CallbackHandler";

export default function CallbackPage() {
  return (
    <Suspense fallback={<div>Redirecting...</div>}>
      <CallbackHandler />
    </Suspense>
  );
}
