"use client";

import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex h-screen">
      <div className="w-full bg-gray-200 h-full flex flex-col justify-center p-10">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-blue-700 p-2 rounded-md">
            <Sparkles size={30} className="text-white" />
          </div>
          <h1 className="font-extrabold text-3xl">Curator</h1>
        </div>
        <h1 className="text-8xl font-bold">
          The Architecture of{" "}
          <span className="text-blue-800 italic">Thought.</span>
        </h1>
        <p className="text-3xl mt-4 text-gray-400">
          Intellectual Airiness. A sanctuary for your digital artifacts, notes,
          and curated wisdom.
        </p>

        <p className="text-sm mt-20">ESTABLISHED 2026 © CURATOR SYSTEM</p>
      </div>

      <div className="w-full h-full flex flex-col justify-center items-center p-4">
        <div className="px-10 py-10 w-[500px]">
          <h1 className="text-4xl font-bold">Create your sanctuary</h1>
          <p className="text-gray-400 font-medium mt-2">
            Begin your journey towards organized clarity.
          </p>

          <div className="flex flex-col mt-8">
            <label className="font-semibold text-sm mb-2">FULL NAME</label>
            <input
              type="text"
              placeholder="Julian Brias"
              className="focus:none outline-none bg-gray-200 rounded-md px-4 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col mt-8">
            <label className="font-semibold text-sm mb-2">EMAIL</label>
            <input
              type="email"
              placeholder="name@domain.com"
              className="focus:none outline-none bg-gray-200 rounded-md px-4 py-2"
            />
          </div>

          <div className="flex flex-col mt-8">
            <label className="font-semibold text-sm mb-2">PASSWORD</label>
            <input
              type="password"
              placeholder="********"
              className="focus:none outline-none bg-gray-200 rounded-md px-4 py-2"
            />
          </div>

          <button className="bg-blue-700 text-white font-bold rounded-md cursor-pointer py-4 px-10 w-full mt-8 flex justify-center gap-2 items-center">
            Create Account <ArrowRight size={20}/>
          </button>

          <div className="flex items-center justify-center gap-2 mt-4 mb-4">
            <input type="checkbox" className="cursor-pointer"/>
            <p>
                I agree to the Terms of Service and Privacy Policy.
            </p>
          </div>

          <p className="text-center">
            Already have an account? {" "}
            <Link
              href="/login"
              className="text-blue-800 font-medium cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default SignUp;
