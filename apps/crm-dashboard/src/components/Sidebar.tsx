import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Zap, 
  LogOut,
  BarChart3
} from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[var(--color-surface-raised)] border-r border-[var(--color-border)] h-screen flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2 border-b border-[var(--color-border)]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight">
          Omni<span className="gradient-text">CRM</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-2">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-500/10 text-indigo-400 font-medium">
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
        <Link href="/leads" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-surface-overlay)] transition-colors">
          <Users className="w-5 h-5" />
          Leads
        </Link>
        <Link href="/campaigns" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-surface-overlay)] transition-colors">
          <BarChart3 className="w-5 h-5" />
          Campaigns
        </Link>
        <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-surface-overlay)] transition-colors">
          <Settings className="w-5 h-5" />
          Settings
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--color-border)]">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-[var(--color-text-secondary)] hover:text-rose-400 hover:bg-rose-500/10 transition-colors text-left">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
