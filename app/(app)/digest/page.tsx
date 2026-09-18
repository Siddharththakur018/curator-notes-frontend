"use client";

import { Newspaper } from "lucide-react";
import AppNavSidebar from "../home/components/AppNavSidebar";

const DigestPage = () => {
  return (
    <div className="flex h-full min-h-0">
      <AppNavSidebar />

      <div className="flex flex-1 items-center justify-center px-6">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg border border-white/10 bg-[#2A2A28]">
            <Newspaper className="h-8 w-8 text-[#D9D6EA]" />
          </div>
          <p className="text-lg font-semibold text-white">
            Weekly digest is coming soon
          </p>
          <p className="mt-2 text-sm leading-6 text-[#9C9B96]">
            A recap of what you saved and what&apos;s worth revisiting will
            show up here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DigestPage;
