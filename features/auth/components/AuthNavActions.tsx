"use client";

import Link from "next/link";
import { useAuth } from "@/context/useAuth";

const AuthNavActions = () => {
  const { user, loading } = useAuth();
  const initial =
    user?.displayName?.trim().charAt(0) || user?.email?.trim().charAt(0) || "U";

  if (loading) {
    return (
      <div className="flex items-center gap-4">
        <div className="h-11 w-36 animate-pulse rounded-lg bg-white/10" />
        <div className="h-11 w-11 animate-pulse rounded-full bg-white/10" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/notes"
          className="rounded-lg bg-[#D9D6EA] px-5 py-3 text-sm font-bold text-[#373785] shadow-lg shadow-black/20 transition hover:bg-[#C9C5E8]"
        >
          Open workspace
        </Link>

        <Link
          href="/settings"
          aria-label="Open account settings"
          title="Open account settings"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-black uppercase text-white transition hover:border-[#D9D6EA]/50 hover:bg-[#D9D6EA] hover:text-[#373785]"
        >
          {initial}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/login"
        className="rounded-lg border border-white/10 px-5 py-3 text-sm font-bold text-white transition hover:border-[#D9D6EA]/45 hover:bg-white/5"
      >
        Sign in
      </Link>

      <Link
        href="/signup"
        className="rounded-lg bg-[#D9D6EA] px-5 py-3 text-sm font-bold text-[#373785] shadow-lg shadow-black/20 transition hover:bg-[#C9C5E8]"
      >
        Get started free
      </Link>
    </div>
  );
};

export default AuthNavActions;
