"use client";

import Loader from "@/components/Loader";
import { useAuth } from "@/context/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ReactNode } from "react";

type RoutesProps = {
  children: ReactNode;
};

const ProtectedRoutes: React.FC<RoutesProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1F1F1E]">
        <Loader size={60} />
      </div>
    );
  }

  if (!user) {
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;
