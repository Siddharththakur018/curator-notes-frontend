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
import { showErrorToast } from "@/utils/toast";

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
      const message = showErrorToast(error, {
        fallback: "Could not create your account.",
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
              <Sparkles size={24} />
            </div>

            <span className="text-2xl font-bold tracking-tight">Curator</span>
          </Link>

          <div>
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#D9D6EA]">
              <Sparkles size={16} />
              Start knowing
            </div>

            <h1 className="max-w-xl text-5xl font-black leading-tight">
              Build a knowledge system that follows through.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#C6C4BD]">
              Create your workspace, capture anything worth keeping, and let
              Curator turn scattered saves into useful daily context.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-white/10 bg-[#2A2A28] p-5">
                <p className="text-3xl font-black text-[#D9D6EA]">Free</p>
                <p className="mt-2 text-sm font-semibold text-[#B8B6AF]">
                  no card needed
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#2A2A28] p-5">
                <p className="text-3xl font-black text-[#D9D6EA]">Daily</p>
                <p className="mt-2 text-sm font-semibold text-[#B8B6AF]">
                  smart digests
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm font-semibold uppercase tracking-wider text-[#8B8A84]">
            Capture less clutter, keep more clarity
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-5 py-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="rounded-lg border border-white/10 bg-[#282826] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="mb-8">
              <Link href="/" className="mb-8 flex w-fit items-center gap-3 lg:hidden">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#D9D6EA] text-[#373785]">
                  <Sparkles size={22} />
                </div>
                <span className="text-2xl font-bold">Curator</span>
              </Link>

              <h1 className="text-4xl font-bold text-white">
                Create account
              </h1>

              <p className="mt-2 text-[#B8B6AF]">
                Start with a free workspace for your saved knowledge.
              </p>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-sm font-bold text-[#D9D6EA]">
                FULL NAME
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#1F1F1E] px-4 py-3 transition-all duration-200 focus-within:border-[#D9D6EA]/70 focus-within:ring-4 focus-within:ring-[#D9D6EA]/10">
                <User size={20} className="text-[#8B8A84]" />

                <input
                  type="text"
                  placeholder="Julian Brias"
                  className="w-full bg-transparent text-white outline-none placeholder:text-[#6A6964]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            {nameError && (
              <p className="mt-2 text-sm font-semibold text-red-400">
                {nameError}
              </p>
            )}

            <div className="flex flex-col mt-6">
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
              <label className="mb-2 text-sm font-bold text-[#D9D6EA]">
                PASSWORD
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#1F1F1E] px-4 py-3 transition-all duration-200 focus-within:border-[#D9D6EA]/70 focus-within:ring-4 focus-within:ring-[#D9D6EA]/10">
                <Lock size={20} className="text-[#8B8A84]" />

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
                  onClick={() => setShowPassword(!showPassword)}
                  size={20}
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
              onClick={handleSignup}
              disabled={!isFormValid || loading}
              className={`mt-8 w-full rounded-lg py-3.5 font-bold transition-all duration-300
  ${
    !isFormValid || loading
      ? "cursor-not-allowed bg-[#3A3A36] text-[#8B8A84]"
      : "cursor-pointer bg-[#D9D6EA] text-[#373785] shadow-lg shadow-black/20 hover:bg-[#C9C5E8]"
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
                className="mt-1 h-4 w-4 cursor-pointer rounded border-white/10 accent-[#D9D6EA]"
              />

              <p className="text-sm leading-6 text-[#B8B6AF]">
                I agree to the Terms of Service and Privacy Policy.
              </p>
            </div>

            <p className="mt-8 text-center text-[#B8B6AF]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-[#D9D6EA] hover:text-white"
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
