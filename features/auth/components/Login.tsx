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
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200">
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900" />

        <div className="absolute top-[-120px] left-[-100px] w-[350px] h-[350px] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[300px] h-[300px] bg-cyan-300/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center px-16 py-20 text-white">
          <div className="flex items-center gap-3 mb-14">
            <div className="bg-white/10 backdrop-blur-xl p-3 rounded-2xl border border-white/20 shadow-lg">
              <FileText size={30} className="text-white" />
            </div>

            <h1 className="font-bold text-3xl tracking-tight">Curator</h1>
          </div>

          <h1 className="text-6xl leading-tight font-extrabold max-w-xl">
            Write smarter,
            <br />
            think better.
          </h1>

          <p className="text-lg text-blue-100 mt-8 leading-8 max-w-xl">
            The intellectual sanctuary for your thoughts. Organize knowledge,
            capture ideas, and structure your workflow with clarity.
          </p>

          <div className="flex gap-6 mt-14">
            <div className="bg-white/10 border border-white/10 rounded-3xl px-6 py-5 backdrop-blur-xl shadow-xl">
              <h3 className="text-2xl font-bold">10k+</h3>
              <p className="text-sm text-blue-100 mt-1">Notes organized</p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl px-6 py-5 backdrop-blur-xl shadow-xl">
              <h3 className="text-2xl font-bold">99%</h3>
              <p className="text-sm text-blue-100 mt-1">Focus retention</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 relative">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl" />

        <div className="w-full max-w-md relative z-10">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/40 shadow-2xl shadow-slate-300/40 rounded-[32px] p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">
                Welcome back
              </h1>

              <p className="text-slate-500 mt-2">
                Sign in to continue to your workspace
              </p>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-sm text-slate-700 mb-2">
                EMAIL
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/50 backdrop-blur-lg px-4 py-3 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-200/50">
                <Mail size={20} className="text-slate-400" />

                <input
                  type="email"
                  placeholder="name@domain.com"
                  className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
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
              <p className="text-red-500 text-sm mt-2">{emailError}</p>
            )}

            <div className="flex flex-col mt-6">
              <div className="flex items-center justify-between mb-2">
                <label className="font-semibold text-sm text-slate-700">
                  PASSWORD
                </label>

                <button className="text-sm text-blue-700 hover:text-blue-800 font-medium cursor-pointer">
                  Forgot Password?
                </button>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/50 backdrop-blur-lg px-4 py-3 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-200/50">
                <Lock className="text-slate-400" size={20} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
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
                  className="text-slate-400 cursor-pointer hover:text-slate-600"
                />
              </div>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-2">{passwordError}</p>
            )}

            <button
              onClick={handleLogin}
              disabled={!isFormValid || loading}
              className={`w-full mt-8 text-white font-semibold rounded-2xl py-3.5 shadow-xl transition-all duration-300
  ${
    !isFormValid || loading
      ? "bg-slate-400 cursor-not-allowed"
      : "bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 cursor-pointer shadow-blue-700/30"
  }`}
            >
              {loading ? <Loader /> : "Sign In"}
            </button>

            <div className="flex items-center gap-4 my-8">
              <hr className="flex-grow border-slate-300/60" />

              <p className="text-sm text-slate-400 whitespace-nowrap">
                or continue with
              </p>

              <hr className="flex-grow border-slate-300/60" />
            </div>

            <button className="flex items-center justify-center gap-3 border border-white/40 bg-white/50 backdrop-blur-lg hover:bg-white/70 transition-all duration-300 rounded-2xl py-3 w-full cursor-pointer shadow-md">
              <FcGoogle size={22} />

              <span className="font-semibold text-slate-700">
                Continue with Google
              </span>
            </button>

            <p className="text-center text-slate-500 mt-8">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-700 hover:text-blue-800 font-semibold"
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
