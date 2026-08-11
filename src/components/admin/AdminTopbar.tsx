"use client";

import { Menu, X } from "lucide-react";

interface AdminTopbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

/**
 * Mobile-only top bar with a hamburger toggle for the admin sidebar.
 * Hidden on desktop (md:hidden) where the sidebar is always visible.
 */
export default function AdminTopbar({
  isSidebarOpen,
  onToggleSidebar,
}: AdminTopbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
      <span className="text-base font-bold text-slate-900">Admin Panel</span>
      <button
        type="button"
        onClick={onToggleSidebar}
        aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        aria-expanded={isSidebarOpen}
        aria-controls="admin-mobile-sidebar"
        className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100"
      >
        {isSidebarOpen ? (
          <X size={22} aria-hidden="true" />
        ) : (
          <Menu size={22} aria-hidden="true" />
        )}
      </button>
    </header>
  );
}
