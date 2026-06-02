
import ProtectedRoutes from "@/routes/ProtectedRoutes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoutes>
      <div className="flex h-screen bg-[#F7F7FB]">
        <main className="flex-1 min-h-0 overflow-y-auto">{children}</main>
      </div>
    </ProtectedRoutes>
  );
}
