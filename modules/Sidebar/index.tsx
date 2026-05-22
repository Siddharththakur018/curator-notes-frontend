"use client";

import { Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { sidebarData } from "./data";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="py-10 px-4">
        <div className="flex items-center gap-4">
          <div className="bg-blue-700 px-2 py-2 rounded-md">
            <Sparkles className=" text-white" />
          </div>
          <div>
            <p className="font-bold text-xl">Curator</p>
            <p className="text-xs font-semibold">INTELLECTUAL</p>
            <p className="text-xs font-semibold">AIRINESS</p>
          </div>
        </div>

        <button className="flex items-center mt-10 bg-blue-800 text-white rounded-md px-4 py-4 w-full justify-center gap-2 cursor-pointer font-extrabold text-xl mb-4">
          <Plus className="text-white" />
          New Note
        </button>

        <div>
          {sidebarData.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.route;

            return (
              <div key={item.route}>
                <Link
                  href={item.route}
                  className={`px-4 py-2 rounded-md flex items-center gap-3 ${isActive ? "bg-gray-200 text-blue-700 border-l-4 border-l-blue-700 rounded-l-xl font-bold" : "text-gray-500 hover:bg-gray-100"}`}
                >
                  <Icon className="w-5 h-5" />
                  {item.title}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
