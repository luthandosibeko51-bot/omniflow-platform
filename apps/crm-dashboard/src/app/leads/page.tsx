import React from 'react';
import { PrismaClient } from '@prisma/client';
import { Users, Mail, Phone, Calendar } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  const prisma = new PrismaClient();
  const businesses = await prisma.business.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      leads: true
    }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Lead Management</h1>
        <p className="text-neutral-400 mt-2">View and manage contact information for all captured prospects.</p>
      </div>

      <div className="glass-card rounded-2xl border border-white/5 bg-neutral-900/50 overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h2 className="text-xl font-semibold text-white">Captured Leads</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-neutral-500 text-sm border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 font-medium">Contact Person</th>
                <th className="px-6 py-4 font-medium">Business</th>
                <th className="px-6 py-4 font-medium">Contact Details</th>
                <th className="px-6 py-4 font-medium">Date Captured</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {businesses.flatMap(biz => 
                biz.leads.map(lead => (
                  <tr key={lead.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold">
                          {lead.firstName[0]}{lead.lastName[0]}
                        </div>
                        <div>
                          <div className="font-medium text-white">{lead.firstName} {lead.lastName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-300">
                      {biz.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-sm">
                        <div className="flex items-center gap-2 text-neutral-300">
                          <Mail className="w-4 h-4 text-neutral-500" />
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-2 text-neutral-300">
                            <Phone className="w-4 h-4 text-neutral-500" />
                            {lead.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {businesses.every(b => b.leads.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-neutral-500 italic">
                    No leads captured yet.
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
