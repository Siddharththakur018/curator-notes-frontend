"use client";

import React, { useState } from "react";
import { Eye, FileText, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const showPassword =

  return (
    <div className="flex h-screen">
      <div className="w-full bg-gray-200 h-full flex flex-col justify-center p-10">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-blue-700 p-2 rounded-md">
            <FileText size={30} className="text-white" />
          </div>
          <h1 className="font-extrabold text-3xl">Curator</h1>
        </div>
        <h1 className="text-8xl font-bold">Write smarter, think better</h1>
        <p className="text-3xl mt-4 text-gray-400">
          The intellectual sanctuary for your thoughts. Organize artifacts, not
          just notes.
        </p>
      </div>

      <div className="w-full h-full flex flex-col justify-center items-center p-4">
        <div className="w-[500px]">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-400 font-medium mt-2">
            Sign in to continue to your notes
          </p>

          <div className="flex flex-col mt-10">
            <label className="font-semibold text-sm mb-2">EMAIL</label>
            <div
              className="flex items-center gap-2 rounded-md border border-gray-400 px-2 py-2 focus-within:border-blue-500 
                  focus-within:ring-2 
                  focus-within:ring-blue-500"
            >
              <Mail size={20} className="text-gray-400" />
              <input
                type="email"
                placeholder="name@domain.com"
                className="focus:none outline-none w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col mt-8">
            <label className="font-semibold text-sm mb-2">PASSWORD</label>
            <div
              className="flex items-center gap-2 rounded-md border border-gray-400 px-2 py-2 focus-within:border-blue-500 
                  focus-within:ring-2 
                  focus-within:ring-blue-500"
            >
              <Lock className="text-gray-400" size={20} />
              <input
                type="password"
                placeholder="********"
                className="focus:none outline-none w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Eye />
            </div>
          </div>

          <button className="bg-blue-700 text-white font-bold rounded-md cursor-pointer py-2 px-10 w-full mt-8">
            Sign In
          </button>

          <div className="flex items-center justify-center gap-4">
            <hr className="flex-grow mt-6 text-gray-300 mb-6" />
            <p>or continue with</p>
            <hr className="flex-grow mt-6 text-gray-300 mb-6" />
          </div>

          <button className="flex items-center justify-center border-gray-400 border px-4 py-2 w-full mb-4 rounded-lg cursor-pointer gap-2">
            <FcGoogle size={20}/>
            <span className="text-lg font-bold">Google</span>
          </button>

          <p className="text-center">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-800 font-medium cursor-pointer"
            >
              Sign up for free
            </Link>
          </p>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Login;
