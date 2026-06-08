import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import AuthProvider from "@/context/AuthContext";
import { ToastProvider } from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: "Curator Notes",
  description: "A calm workspace for collecting and shaping your notes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
