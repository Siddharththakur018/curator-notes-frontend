
import type { Metadata } from "next";
import ProtectedRoutes from "@/routes/ProtectedRoutes";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoutes>
      <div className="flex h-screen bg-[#1F1F1E]">
        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </ProtectedRoutes>
  );
}
