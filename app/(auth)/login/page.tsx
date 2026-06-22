import type { Metadata } from "next";
import Login from "@/features/auth/components/Login";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your private Curator Notes workspace.",
  robots: {
    index: false,
    follow: false,
  },
};

const LoginPage = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
