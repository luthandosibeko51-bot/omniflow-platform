import React from 'react';
import { PrismaClient } from '@prisma/client';
import { 
  Users, 
  Send, 
  Eye, 
  CheckCircle, 
  TrendingUp,
  MoreVertical,
  Building2
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const prisma = new PrismaClient();
  const businesses = await prisma.business.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { events: true }
      }
    }
  });

  const stats = [
    { name: 'Total Prospects', value: businesses.length, icon: Users, color: 'text-blue-500' },
    { name: 'Outreach Sent', value: businesses.filter((b: any)=> b.status !== 'PENDING_OUTREACH').length, icon: Send, color: 'text-indigo-500' },
    { name: 'Demos Viewed', value: businesses.filter((b: any) => b.status === 'DEMO_VIEWED').length, icon: Eye, color: 'text-emerald-500' },
    { name: 'Conversions', value: businesses.filter((b: any)=> b.status === 'CLAIMED').length, icon: CheckCircle, color: 'text-orange-500' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Omniflow CRM</h1>
        <p className="text-neutral-400 mt-2">Manage your autonomous business acquisition pipeline.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((st: anyat) => (
          <div key={stat.name} className="glass-card p-6 rounded-2xl border border-white/5 bg-neutral-900/50">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-neutral-500 mt-1">{stat.name}</div>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <div className="glass-card rounded-2xl border border-white/5 bg-neutral-900/50 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Prospect Pipeline</h2>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
            Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-neutral-500 text-sm border-b border-white/5">
                <th className="px-6 py-4 font-medium">Business</th>
                <th className="px-6 py-4 font-medium">Industry</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Events</th>
                <th className="px-6 py-4 font-medium">Added</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {businesses.length > 0 ? businesses.map((biz) => (
                <tr key={biz.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{biz.name}</div>
                        <div className="text-xs text-neutral-500">ID: {biz.id.slice(0, 8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-300">
                    {biz.industry}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      biz.status === 'CLAIMED' ? 'bg-emerald-500/10 text-emerald-500' :
                      biz.status === 'DEMO_VIEWED' ? 'bg-blue-500/10 text-blue-500' :
                      biz.status === 'CONTACTED' ? 'bg-indigo-500/10 text-indigo-400' :
                      'bg-neutral-500/10 text-neutral-500'
                    }`}>
                      {biz.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-400">
                    {biz._count.events} events
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-500">
                    {new Date(biz.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-white/5 rounded text-neutral-500 transition">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-500 italic">
                    No businesses found. Run the automation engine to populate.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
