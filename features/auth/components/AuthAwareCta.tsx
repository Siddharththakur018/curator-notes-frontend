"use client";

import Link from "next/link";
import { useAuth } from "@/context/useAuth";

type AuthAwareCtaProps = {
  children: React.ReactNode;
  authenticatedLabel?: string;
  className: string;
  signedOutHref?: string;
  signedInHref?: string;
};

const AuthAwareCta = ({
  children,
  authenticatedLabel = "Open workspace",
  className,
  signedOutHref = "/signup",
  signedInHref = "/notes",
}: AuthAwareCtaProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <span className={`${className} cursor-wait opacity-70`}>
        Checking workspace...
      </span>
    );
  }

  return (
    <Link href={user ? signedInHref : signedOutHref} className={className}>
      {user ? authenticatedLabel : children}
    </Link>
  );
};

export default AuthAwareCta;
