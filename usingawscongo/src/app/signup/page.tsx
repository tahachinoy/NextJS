// 'use client';
// import React, { useState } from 'react';
// import Link from 'next/link';

// export default function Signup() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     password2: '',
//   });

//   const [errors, setErrors] = useState({
//     username: '',
//     email: '',
//     password: '',
//     password2: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData({ ...formData, [id]: value });
//     setErrors({ ...errors, [id]: '' }); // Clear error on change
//   };

//   const validateForm = () => {
//     const newErrors: any = {};
//     if (!formData.username.trim()) newErrors.username = 'Username is required';
//     if (!formData.email.includes('@')) newErrors.email = 'Invalid email address';
//     if (!formData.password) newErrors.password = 'Password is required';
//     if (formData.password !== formData.password2) newErrors.password2 = 'Passwords do not match';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log('Form submitted successfully:', formData);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#ECF0F1]">
//       <div className="bg-white rounded-md shadow-lg w-[400px]">
//         <form id="form" className="p-8" onSubmit={handleSubmit}>
//           <h2 className="text-center text-2xl font-semibold mb-6">Sign Up</h2>

//           {/* Username */}
//           <div className="mb-5 pb-5 relative">
//             <label htmlFor="username" className="text-gray-600 block mb-1">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               placeholder="Enter username"
//               value={formData.username}
//               onChange={handleChange}
//               className={`w-full p-2 border-2 rounded-md focus:outline-none ${
//                 errors.username ? 'border-red-500' : 'border-[#ECF0F1] focus:border-gray-500'
//               }`}
//             />
//             <small
//               className={`absolute left-0 bottom-0 text-sm text-[orangered] transition-opacity duration-300 ${
//                 errors.username ? 'opacity-100' : 'opacity-0'
//               }`}
//             >
//               {errors.username}
//             </small>
//           </div>

//           {/* Email */}
//           <div className="mb-5 pb-5 relative">
//             <label htmlFor="email" className="text-gray-600 block mb-1">
//               Email
//             </label>
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
//             <small
//               className={`absolute left-0 bottom-0 text-sm text-[orangered] transition-opacity duration-300 ${
//                 errors.email ? 'opacity-100' : 'opacity-0'
//               }`}
//             >
//               {errors.email}
//             </small>
//           </div>

//           {/* Password */}
//           <div className="mb-5 pb-5 relative">
//             <label htmlFor="password" className="text-gray-600 block mb-1">
//               Password
//             </label>
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
//             <small
//               className={`absolute left-0 bottom-0 text-sm text-[orangered] transition-opacity duration-300 ${
//                 errors.password ? 'opacity-100' : 'opacity-0'
//               }`}
//             >
//               {errors.password}
//             </small>
//           </div>

//           {/* Confirm Password */}
//           <div className="mb-5 pb-5 relative">
//             <label htmlFor="password2" className="text-gray-600 block mb-1">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="password2"
//               placeholder="Enter password"
//               value={formData.password2}
//               onChange={handleChange}
//               className={`w-full p-2 border-2 rounded-md focus:outline-none ${
//                 errors.password2 ? 'border-red-500' : 'border-[#ECF0F1] focus:border-gray-500'
//               }`}
//             />
//             <small
//               className={`absolute left-0 bottom-0 text-sm text-[orangered] transition-opacity duration-300 ${
//                 errors.password2 ? 'opacity-100' : 'opacity-0'
//               }`}
//             >
//               {errors.password2}
//             </small>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[navy] text-white text-lg py-2 px-4 rounded-md border-2 border-[navy] hover:bg-blue-900 transition-colors cursor-pointer"
//           >
//             Submit
//           </button>
//         </form>

//         <div className="flex flex-col items-center justify-center">
//           <div className="mb-5 pb-5 relative">
//             Already have an account?
//             <Link href="/" className="underline hover:text-blue-900 p-2">
//               Log in
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';
import { useState } from "react";
import Link from "next/link";
import { signUp } from "@/lib/cognito";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg]           = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(username, password, email);
      setMsg("✅ Code sent! Check your email.");
      router.push("/confirm");
    } catch (err: any) {
      setMsg(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECF0F1]">
      <form onSubmit={handleSignUp} className="bg-white p-8 rounded shadow-md w-[400px]">
        <h2 className="text-center text-2xl mb-6">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
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
          Sign Up
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
