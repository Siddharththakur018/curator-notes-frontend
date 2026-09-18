"use client";

import { Inbox } from "lucide-react";
import AppNavSidebar from "../home/components/AppNavSidebar";

const InboxPage = () => {
  return (
    <div className="flex h-full min-h-0">
      <AppNavSidebar />

      <div className="flex flex-1 items-center justify-center px-6">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg border border-white/10 bg-[#2A2A28]">
            <Inbox className="h-8 w-8 text-[#D9D6EA]" />
          </div>
          <p className="text-lg font-semibold text-white">
            Inbox is coming soon
          </p>
          <p className="mt-2 text-sm leading-6 text-[#9C9B96]">
            This is where links, PDFs, and quick saves will land before you
            triage them into notes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
