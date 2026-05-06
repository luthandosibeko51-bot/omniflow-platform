'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Globe,
  Sparkles,
  Bot,
  CalendarCheck,
  BarChart3,
  Search,
  Palette,
  ShieldCheck,
  ArrowRight,
  Check,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

const websiteFeatures = [
  { icon: Palette, title: 'Custom Design', desc: 'Unique, brand-aligned designs that stand out from templates.' },
  { icon: Globe, title: 'Mobile Optimized', desc: 'Looks perfect on every device — phone, tablet, and desktop.' },
  { icon: Search, title: 'SEO Built-In', desc: 'Rank on Google so local customers can find you instantly.' },
  { icon: ShieldCheck, title: 'Fast & Secure', desc: 'Enterprise-grade hosting with SSL security included.' },
];

const aiFeatures = [
  { icon: Bot, title: 'AI Chatbots', desc: 'Engage visitors 24/7 with intelligent conversational assistants.' },
  { icon: CalendarCheck, title: 'Automated Booking', desc: 'Let customers book appointments without phone calls.' },
  { icon: BarChart3, title: 'Lead Generation', desc: 'AI identifies and nurtures potential customers automatically.' },
  { icon: Sparkles, title: 'Smart Analytics', desc: 'Understand your customers better with AI-powered insights.' },
];

const plans = [
  {
    name: 'Starter',
    subtitle: 'Get Online',
    price: 'Free Preview',
    features: [
      'Professional 5-page website',
      'Mobile-responsive design',
      'Basic SEO setup',
      'Contact form integration',
      'SSL certificate',
    ],
    cta: 'Get Free Preview',
    highlighted: false,
  },
  {
    name: 'Growth',
    subtitle: 'Get Customers',
    price: 'Custom',
    features: [
      'Everything in Starter',
      'Advanced SEO & Google listing',
      'AI chatbot integration',
      'Automated booking system',
      'Monthly performance reports',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    subtitle: 'Get Automated',
    price: 'Custom',
    features: [
      'Everything in Growth',
      'Full AI automation suite',
      'CRM & lead management',
      'Custom integrations',
      'Priority 24/7 support',
      'Quarterly strategy sessions',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="section-padding bg-radial-glow bg-grid relative overflow-hidden">
        <div className="absolute top-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-[var(--color-text-secondary)] mb-8">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Our Services
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            From <span className="gradient-text">Zero to Online</span> to{' '}
            <span className="gradient-text">AI-Powered</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            We take your business on a step-by-step digital journey. Start with a world-class website, then unlock the full power of AI when you&apos;re ready.
          </motion.p>
        </div>
      </section>

      {/* ====== STEP 1: WEBSITE ====== */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
            <p className="text-sm font-mono text-indigo-400 mb-2">Step 01</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Your <span className="gradient-text">Professional Website</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-xl">
              Every great digital journey starts with a great website. We design and build a site that turns visitors into paying customers.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {websiteFeatures.map((feat, i) => (
              <motion.div key={feat.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="glass-card glow-border p-6 group hover:bg-[var(--color-surface-overlay)] transition-colors">
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="font-bold mb-2">{feat.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== STEP 2: AI ====== */}
      <section className="section-padding bg-[var(--color-surface-raised)] border-y border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
            <p className="text-sm font-mono text-cyan-400 mb-2">Step 02</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Unlock <span className="gradient-text">AI-Powered Growth</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-xl">
              When your website is running and customers are flowing, supercharge your business with intelligent automation.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {aiFeatures.map((feat, i) => (
              <motion.div key={feat.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="glass-card glow-border p-6 group hover:bg-[var(--color-surface-overlay)] transition-colors">
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feat.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-bold mb-2">{feat.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PRICING ====== */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Simple, <span className="gradient-text">Transparent Plans</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
              Start free and scale as your business grows.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className={`glass-card p-8 flex flex-col ${plan.highlighted ? 'glow-border ring-1 ring-indigo-500/30' : 'border border-[var(--color-border)]'}`}
              >
                <p className="text-sm font-mono text-indigo-400 mb-1">{plan.subtitle}</p>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold gradient-text mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                      <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={plan.highlighted ? 'btn-primary text-center' : 'btn-secondary text-center'}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="section-padding bg-[var(--color-surface-raised)] border-t border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Not Sure Where to Start?
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg mb-8">
              Get a free, personalized demo of what your website could look like. No commitment, no pressure.
            </p>
            <Link href="/contact" className="btn-primary text-base">
              Request Your Free Demo <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
