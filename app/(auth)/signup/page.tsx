import type { Metadata } from "next";
import SignUp from "@/features/auth/components/SignUp";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a private Curator Notes workspace.",
  robots: {
    index: false,
    follow: false,
  },
};

const SignUpPage = () => {
  return <SignUp />;
};

export default SignUpPage;
