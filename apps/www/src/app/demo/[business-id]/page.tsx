import React from 'react';
import { notFound } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import ClaimButton from '@/components/ClaimButton';

interface DemoPageProps {
  params: Promise<{
    'business-id': string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function DemoPage({ params }: DemoPageProps) {
  const prisma = new PrismaClient();
  const resolvedParams = await params;
  const businessId = resolvedParams['business-id'];

  if (!businessId) {
    return notFound();
  }

  const business = await prisma.business.findUnique({
    where: { id: businessId },
    include: {
      demoSite: true,
    },
  });

  if (!business) {
    return notFound();
  }

  // Parse the generated copy
  let content: any = null;
  if (business.demoSite?.generatedCopy) {
    try {
      content = JSON.parse(business.demoSite.generatedCopy);
    } catch (e) {
      console.error("Failed to parse demo content", e);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-indigo-500/30">
      {/* Top Banner */}
      <div className="bg-indigo-600 px-4 py-2 text-center text-sm font-medium">
        Preview Mode: This is a professional mockup created for {business.name}
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
            {content?.hero?.title || `Elevate Your ${business.industry} Business`}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto mb-10">
            {content?.hero?.subtitle || `Experience the future of your online presence with Omniflow's specialized solutions.`}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <ClaimButton businessId={businessId} />
            <button className="px-8 py-4 glass-card font-bold rounded-full border border-white/10 hover:bg-white/5 transition-colors">
              Book Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose {business.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content?.features?.map((f: any, i: number) => (
              <div key={i} className="p-8 rounded-2xl border border-white/5 bg-neutral-900 hover:border-indigo-500/30 transition-colors">
                <h3 className="text-xl font-bold mb-4 text-indigo-400">{f.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{f.description}</p>
              </div>
            )) || (
              [1, 2, 3].map(i => (
                <div key={i} className="p-8 rounded-2xl border border-white/5 bg-neutral-900 animate-pulse">
                  <div className="h-6 w-1/2 bg-neutral-800 rounded mb-4"></div>
                  <div className="h-20 bg-neutral-800 rounded"></div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">About Us</h2>
          <p className="text-xl text-neutral-400 leading-relaxed italic">
            "{content?.about || `${business.name} is a leading provider in the ${business.industry} industry, dedicated to excellence and customer satisfaction.`}"
          </p>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-neutral-500 text-sm mb-4">© 2026 {business.name}. Powered by Omniflow.</p>
        <div className="flex justify-center gap-6 text-neutral-400 text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
