import Sidebar from "@/modules/Sidebar";
import ProtectedRoutes from "@/routes/ProtectedRoutes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoutes>
      <div className="flex h-screen">
        <aside className="bg-gray-100 shadow-md w-60">
          <Sidebar />
        </aside>

        <div>{children}</div>
      </div>
    </ProtectedRoutes>
  );
}
