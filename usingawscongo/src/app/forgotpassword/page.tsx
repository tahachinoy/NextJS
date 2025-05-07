// 'use client';
// import React, { useState } from 'react';
// import Link from 'next/link';

// export default function ForgotPassword() {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email.includes('@')) {
//       setError('Please enter a valid email address');
//     } else {
//       setError('');
//       console.log('Password reset email sent to:', email);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#ECF0F1]">
//       <div className="bg-white rounded-md shadow-lg w-[400px]">
//         <form onSubmit={handleSubmit} className="p-8">
//           <h2 className="text-center text-2xl font-semibold mb-6">Reset Password</h2>

//           <div className="mb-5 pb-5 relative">
//             <label htmlFor="email" className="text-gray-600 block mb-1">Email</label>
//             <input
//               type="text"
//               id="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//                 setError('');
//               }}
//               className={`w-full p-2 border-2 rounded-md focus:outline-none ${
//                 error ? 'border-red-500' : 'border-[#ECF0F1] focus:border-gray-500'
//               }`}
//             />
//             <small className={`absolute left-0 bottom-0 text-sm text-[orangered] ${
//               error ? 'opacity-100' : 'opacity-0'
//             }`}>
//               {error}
//             </small>
//           </div>

//           <button type="submit" className="w-full bg-[navy] text-white text-lg py-2 px-4 rounded-md border-2 border-[navy] hover:bg-blue-900 transition-colors cursor-pointer">
//             Send Reset Link
//           </button>
//         </form>

//         <div className="flex flex-col items-center justify-center">
//           <Link href="/" className="underline hover:text-blue-900 p-2">Back to Login</Link>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';
import { useState } from "react";
import Link from "next/link";
import { forgotPassword } from "@/lib/cognito";
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg]     = useState("");
  const router = useRouter();

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMsg("✅ Code sent! Check your email.");
      router.push("/reset-password");
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECF0F1]">
      <form onSubmit={handleForgot} className="bg-white p-8 rounded shadow-md w-[400px]">
        <h2 className="text-center text-2xl mb-6">Forgot Password</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full py-2 bg-[navy] text-white rounded">
          Send Code
        </button>
        <p className="mt-4 text-center">{msg}</p>
        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-600 underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
