"use client";

import { useState } from "react";
import { ArrowRight, Eye, Lock, Mail, Sparkles, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/useAuth";
import { useRouter } from "next/navigation";
import {
  validateEmail,
  validatePassword,
  isValidEmail,
  isValidPassword,
} from "@/utils/validation";
import Loader from "@/components/Loader";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const isFormValid = isValidEmail(email) && isValidPassword(password);

  const handleSignup = async () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");

    try {
      setLoading(true);
      await signup(name, email, password);
      router.push("/login");
      console.log("Signup success");
    } catch (error) {
      console.error(error);
      setPasswordError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200">
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-700" />

        <div className="absolute top-[-120px] left-[-100px] w-[350px] h-[350px] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[300px] h-[300px] bg-cyan-300/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center px-16 py-20 text-white">
          <div className="flex items-center gap-3 mb-14">
            <div className="bg-white/10 backdrop-blur-xl p-3 rounded-2xl border border-white/20 shadow-lg">
              <Sparkles size={30} className="text-white" />
            </div>

            <h1 className="font-bold text-3xl tracking-tight">Curator</h1>
          </div>

          <h1 className="text-6xl leading-tight font-extrabold max-w-2xl">
            The Architecture
            <br />
            of{" "}
            <span className="bg-gradient-to-r from-cyan-200 to-blue-300 bg-clip-text text-transparent italic">
              Thought.
            </span>
          </h1>

          <p className="text-lg text-blue-100 mt-8 leading-8 max-w-xl">
            Intellectual airiness for your digital world. Capture ideas,
            preserve insights, and build your personal knowledge sanctuary.
          </p>

          <div className="flex gap-6 mt-14">
            <div className="bg-white/10 border border-white/10 rounded-3xl px-6 py-5 backdrop-blur-xl shadow-xl">
              <h3 className="text-2xl font-bold">Secure</h3>
              <p className="text-sm text-blue-100 mt-1">
                Private knowledge system
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl px-6 py-5 backdrop-blur-xl shadow-xl">
              <h3 className="text-2xl font-bold">Minimal</h3>
              <p className="text-sm text-blue-100 mt-1">
                Focused writing experience
              </p>
            </div>
          </div>

          <p className="text-sm text-blue-100/70 mt-20 tracking-[0.2em]">
            ESTABLISHED 2026 © CURATOR SYSTEM
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 relative">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl" />

        <div className="w-full max-w-md relative z-10">
          <div className="bg-white/60 backdrop-blur-2xl border border-white/40 shadow-2xl shadow-slate-300/40 rounded-[32px] p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-slate-900">
                Create account
              </h1>

              <p className="text-slate-500 mt-2">
                Begin your journey towards organized clarity.
              </p>
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-sm text-slate-700 mb-2">
                FULL NAME
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/50 backdrop-blur-lg px-4 py-3 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-200/50">
                <User size={20} className="text-slate-400" />

                <input
                  type="text"
                  placeholder="Julian Brias"
                  className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            {nameError && (
              <p className="text-red-500 text-sm mt-2">{nameError}</p>
            )}

            <div className="flex flex-col mt-6">
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
              <label className="font-semibold text-sm text-slate-700 mb-2">
                PASSWORD
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/50 backdrop-blur-lg px-4 py-3 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-200/50">
                <Lock size={20} className="text-slate-400" />

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
                  onClick={() => setShowPassword(!showPassword)}
                  size={20}
                  className="text-slate-400 cursor-pointer hover:text-slate-600"
                />
              </div>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-2">{passwordError}</p>
            )}

            <button
              onClick={handleSignup}
              disabled={!isFormValid || loading}
              className={`w-full mt-8 text-white font-semibold rounded-2xl py-3.5 shadow-xl transition-all duration-300
  ${
    !isFormValid || loading
      ? "bg-slate-400 cursor-not-allowed"
      : "bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 cursor-pointer shadow-blue-700/30"
  }`}
            >
              {loading ? (
                <Loader />
              ) : (
                <div className="flex items-center justify-center">
                  Create Account <ArrowRight size={20} />
                </div>
              )}
            </button>

            <div className="flex items-start gap-3 mt-6">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 cursor-pointer"
              />

              <p className="text-sm text-slate-500 leading-6">
                I agree to the Terms of Service and Privacy Policy.
              </p>
            </div>

            <p className="text-center text-slate-500 mt-8">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-700 hover:text-blue-800 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
