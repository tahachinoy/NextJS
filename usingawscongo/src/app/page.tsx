// 'use client';
// import React, { useState } from 'react';
// import Link from 'next/link';

// export default function Login() {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [errors, setErrors] = useState({ email: '', password: '' });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//     setErrors({ ...errors, [id]: '' });
//   };

//   const validateForm = () => {
//     const newErrors: any = {};
//     if (!formData.email.includes('@')) newErrors.email = 'Invalid email address';
//     if (!formData.password) newErrors.password = 'Password is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log('Login submitted:', formData);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#ECF0F1]">
//       <div className="bg-white rounded-md shadow-lg w-[400px]">
//         <form onSubmit={handleSubmit} className="p-8">
//           <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>

//           {/* Email */}
//           <div className="mb-5 pb-5 relative">
//             <label htmlFor="email" className="text-gray-600 block mb-1">Email</label>
//             <input
//               type="text"
//               id="email"
//               placeholder="Enter email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`w-full p-2 border-2 rounded-md focus:outline-none ${
//                 errors.email ? 'border-red-500' : 'border-[#ECF0F1] focus:border-gray-500'
//               }`}
//             />
//             <small className={`absolute left-0 bottom-0 text-sm text-[orangered] ${
//               errors.email ? 'opacity-100' : 'opacity-0'
//             }`}>
//               {errors.email}
//             </small>
//           </div>

//           {/* Password */}
//           <div className="mb-5 pb-5 relative">
//             <label htmlFor="password" className="text-gray-600 block mb-1">Password</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter password"
//               value={formData.password}
//               onChange={handleChange}
//               className={`w-full p-2 border-2 rounded-md focus:outline-none ${
//                 errors.password ? 'border-red-500' : 'border-[#ECF0F1] focus:border-gray-500'
//               }`}
//             />
//             <small className={`absolute left-0 bottom-0 text-sm text-[orangered] ${
//               errors.password ? 'opacity-100' : 'opacity-0'
//             }`}>
//               {errors.password}
//             </small>
//           </div>

//           <button type="submit" className="w-full bg-[navy] text-white text-lg py-2 px-4 rounded-md border-2 border-[navy] hover:bg-blue-900 transition-colors cursor-pointer">
//             Login
//           </button>
//         </form>

//         <div className="flex flex-col items-center justify-center">
//           <Link href="/forgotpassword" className="hover:text-blue-700 underline mb-2">Forgot Password?</Link>
          
//           <span>
//             Don’t have an account?{' '}
//             <Link href="/signup" className="underline hover:text-blue-900">Sign Up</Link>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';
import { useState } from "react";
import Link from "next/link";
import { signIn } from "@/lib/cognito";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await signIn(email, password);
      setMsg("✅ Logged in!");
      console.log(resp.AuthenticationResult);
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECF0F1]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-[400px]">
        <h2 className="text-center text-2xl mb-6">Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full py-2 bg-[navy] text-white rounded">
          Sign In
        </button>
        <p className="mt-4 text-center">{msg}</p>
        <div className="mt-6 text-center">
          <Link href="/forgotpassword" className="text-blue-600 underline">
            Forgot Password?
          </Link>
          <br />
          <Link href="/signup" className="text-blue-600 underline">
            Don’t have an account? Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
