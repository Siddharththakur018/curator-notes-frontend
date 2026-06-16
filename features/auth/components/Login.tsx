"use client";

import React, { useState } from "react";
import { Eye, FileText, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/useAuth";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import {
  validateEmail,
  validatePassword,
  isValidEmail,
  isValidPassword,
} from "@/utils/validation";
import { showErrorToast } from "@/utils/toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const isFormValid = isValidEmail(email) && isValidPassword(password);

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    try {
      setLoading(true);
      await login(email, password);
      router.push("/notes");
      console.log("Login success");
    } catch (error) {
      console.error(error);
      const message = showErrorToast(error, {
        fallback: "Invalid credentials.",
      });
      setPasswordError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#1F1F1E] text-white">
      <div className="hidden w-1/2 border-r border-white/10 bg-[#252523] lg:flex">
        <div className="flex w-full flex-col justify-between px-16 py-14">
          <Link href="/" className="flex w-fit items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#D9D6EA] text-[#373785]">
              <FileText size={24} />
            </div>

            <span className="text-2xl font-bold tracking-tight">Curator</span>
          </Link>

          <div>
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#D9D6EA]">
              <FileText size={16} />
              Welcome back
            </div>

            <h1 className="max-w-xl text-5xl font-black leading-tight">
              Pick up where your ideas left off.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#C6C4BD]">
              Sign in to review your digest, search saved knowledge, and turn
              the useful pieces into action.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-white/10 bg-[#2A2A28] p-5">
                <p className="text-3xl font-black text-[#D9D6EA]">2,400+</p>
                <p className="mt-2 text-sm font-semibold text-[#B8B6AF]">
                  active curators
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#2A2A28] p-5">
                <p className="text-3xl font-black text-[#D9D6EA]">14k</p>
                <p className="mt-2 text-sm font-semibold text-[#B8B6AF]">
                  ideas resurfaced
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm font-semibold uppercase tracking-wider text-[#8B8A84]">
            Your second brain, organized daily
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-5 py-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="rounded-lg border border-white/10 bg-[#282826] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="mb-8">
              <Link href="/" className="mb-8 flex w-fit items-center gap-3 lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#D9D6EA] text-[#373785]">
                  <FileText size={22} />
                </div>
                <span className="text-2xl font-bold">Curator</span>
              </Link>

              <h1 className="text-3xl font-bold text-white">
                Welcome back
              </h1>

              <p className="mt-2 text-[#B8B6AF]">
                Sign in to continue to your workspace
              </p>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-sm font-bold text-[#D9D6EA]">
                EMAIL
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#1F1F1E] px-4 py-3 transition-all duration-200 focus-within:border-[#D9D6EA]/70 focus-within:ring-4 focus-within:ring-[#D9D6EA]/10">
                <Mail size={20} className="text-[#8B8A84]" />

                <input
                  type="email"
                  placeholder="name@domain.com"
                  className="w-full bg-transparent text-white outline-none placeholder:text-[#6A6964]"
                  value={email}
                  onChange={(e) => {
                    const value = e.target.value;

                    setEmail(value);
                    setEmailError(validateEmail(value));
                  }}
                />
              </div>
            </div>
            {emailError && (
              <p className="mt-2 text-sm font-semibold text-red-400">
                {emailError}
              </p>
            )}

            <div className="flex flex-col mt-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-[#D9D6EA]">
                  PASSWORD
                </label>

                <button className="cursor-pointer text-sm font-semibold text-[#C6C4BD] hover:text-white">
                  Forgot Password?
                </button>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#1F1F1E] px-4 py-3 transition-all duration-200 focus-within:border-[#D9D6EA]/70 focus-within:ring-4 focus-within:ring-[#D9D6EA]/10">
                <Lock className="text-[#8B8A84]" size={20} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-white outline-none placeholder:text-[#6A6964]"
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;

                    setPassword(value);
                    setPasswordError(validatePassword(value));
                  }}
                />

                <Eye
                  size={20}
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer text-[#8B8A84] hover:text-white"
                />
              </div>
            </div>
            {passwordError && (
              <p className="mt-2 text-sm font-semibold text-red-400">
                {passwordError}
              </p>
            )}

            <button
              onClick={handleLogin}
              disabled={!isFormValid || loading}
              className={`mt-8 w-full rounded-lg py-3.5 font-bold transition-all duration-300
  ${
    !isFormValid || loading
      ? "cursor-not-allowed bg-[#3A3A36] text-[#8B8A84]"
      : "cursor-pointer bg-[#D9D6EA] text-[#373785] shadow-lg shadow-black/20 hover:bg-[#C9C5E8]"
  }`}
            >
              {loading ? <Loader /> : "Sign In"}
            </button>

            <div className="flex items-center gap-4 my-8">
              <hr className="flex-grow border-white/10" />

              <p className="whitespace-nowrap text-sm text-[#8B8A84]">
                or continue with
              </p>

              <hr className="flex-grow border-white/10" />
            </div>

            <button className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 py-3 transition-all duration-300 hover:border-[#D9D6EA]/45 hover:bg-white/10">
              <FcGoogle size={22} />

              <span className="font-semibold text-white">
                Continue with Google
              </span>
            </button>

            <p className="mt-8 text-center text-[#B8B6AF]">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-bold text-[#D9D6EA] hover:text-white"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
