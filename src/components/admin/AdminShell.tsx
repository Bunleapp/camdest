"use client";

import { ReactNode, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

interface AdminShellProps {
  children: ReactNode;
}

/**
 * Client-side shell that manages the mobile sidebar open/closed state.
 * Desktop: sidebar is always visible in a fixed column.
 * Mobile/tablet: sidebar is an overlay toggled by AdminTopbar.
 */
export default function AdminShell({ children }: AdminShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="hidden md:block md:w-64 md:shrink-0">
        <div className="fixed inset-y-0 left-0 w-64">
          <AdminSidebar />
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        id="admin-mobile-sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar />
      </div>

      <div className="flex min-h-screen w-full flex-1 flex-col md:ml-64">
        <AdminTopbar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
        />
        <main id="admin-main-content" className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
