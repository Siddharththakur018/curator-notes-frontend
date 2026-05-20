import Navbar from "@/components/ui/Navbar";
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

        <div className="flex-1 flex flex-col min-h-0">
          <div>
            <Navbar />
          </div>
          <main className="flex-1 min-h-0 overflow-y-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoutes>
  );
}
