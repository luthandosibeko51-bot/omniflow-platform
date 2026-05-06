import React from 'react';
import { PrismaClient } from '@prisma/client';
import { BarChart3, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CampaignsPage() {
  const prisma = new PrismaClient();
  const events = await prisma.campaignEvent.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      business: true
    },
    take: 50 // Limit to recent 50 events for dashboard
  });

  const businesses = await prisma.business.findMany();
  
  const totalSent = businesses.filter(b => b.status !== 'PENDING_OUTREACH').length;
  const totalViewed = businesses.filter(b => b.status === 'DEMO_VIEWED' || b.status === 'CLAIMED').length;
  const totalClaimed = businesses.filter(b => b.status === 'CLAIMED').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Outreach Campaigns</h1>
        <p className="text-neutral-400 mt-2">Monitor the performance of your automated AI outreach.</p>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-white/5 bg-neutral-900/50">
          <div className="flex items-center gap-3 mb-2 text-indigo-400">
            <Send className="w-5 h-5" />
            <h3 className="font-semibold">Emails Sent</h3>
          </div>
          <div className="text-3xl font-bold text-white">{totalSent}</div>
        </div>
        
        <div className="glass-card p-6 rounded-2xl border border-white/5 bg-neutral-900/50">
          <div className="flex items-center gap-3 mb-2 text-blue-400">
            <BarChart3 className="w-5 h-5" />
            <h3 className="font-semibold">Demos Viewed</h3>
          </div>
          <div className="text-3xl font-bold text-white">{totalViewed}</div>
          <p className="text-xs text-neutral-500 mt-1">
            {totalSent > 0 ? Math.round((totalViewed / totalSent) * 100) : 0}% open rate
          </p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/5 bg-neutral-900/50">
          <div className="flex items-center gap-3 mb-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="font-semibold">Websites Claimed</h3>
          </div>
          <div className="text-3xl font-bold text-white">{totalClaimed}</div>
          <p className="text-xs text-neutral-500 mt-1">
            {totalViewed > 0 ? Math.round((totalClaimed / totalViewed) * 100) : 0}% conversion rate
          </p>
        </div>
      </div>

      {/* Event Feed */}
      <div className="glass-card rounded-2xl border border-[var(--color-border)] bg-neutral-900/50 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Activity Feed</h2>
        
        <div className="space-y-4">
          {events.length > 0 ? events.map(event => (
            <div key={event.id} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className={`p-2 rounded-lg ${
                event.eventType === 'demo_viewed' ? 'bg-blue-500/20 text-blue-400' :
                event.eventType === 'claim_button_hovered' ? 'bg-orange-500/20 text-orange-400' :
                'bg-neutral-500/20 text-neutral-400'
              }`}>
                {event.eventType === 'demo_viewed' ? <BarChart3 className="w-4 h-4" /> : 
                 event.eventType === 'claim_button_hovered' ? <AlertCircle className="w-4 h-4" /> :
                 <CheckCircle2 className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-sm font-medium text-white">
                  <span className="text-indigo-400">{event.business.name}</span> triggered <span className="font-mono bg-white/10 px-1 py-0.5 rounded text-xs">{event.eventType}</span>
                </div>
                <div className="text-xs text-neutral-500 mt-1">
                  {new Date(event.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          )) : (
            <p className="text-center text-neutral-500 italic py-8">
              No recent campaign activity. Run the outreach engine to start generating events.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
