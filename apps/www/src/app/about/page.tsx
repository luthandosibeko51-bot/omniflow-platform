'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Lightbulb,
  Heart,
  Target,
  Users,
  ArrowRight,
  Zap,
  Globe,
  TrendingUp,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

const values = [
  {
    icon: Heart,
    title: 'Empowerment',
    description: 'We believe every South African entrepreneur deserves a digital presence, regardless of technical skill or budget.',
    color: 'from-rose-500 to-pink-600',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We use cutting-edge AI and automation so your business stays ahead of the curve — without the complexity.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Target,
    title: 'Impact',
    description: 'Every website we build, every automation we deploy, is measured by the real-world growth it drives for your business.',
    color: 'from-indigo-500 to-violet-600',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We are building a network of digitally empowered South African businesses that lift each other up.',
    color: 'from-emerald-500 to-teal-600',
  },
];

const milestones = [
  { year: 'Founded', title: 'OmnitechWorks is Born', desc: 'Luthando Sibeko establishes OmnitechWorks with a bold vision: digitize South Africa\'s offline businesses.' },
  { year: 'Phase 1', title: 'OmniFlow Launches', desc: 'The autonomous website generation and business acquisition platform goes live at omnitechwork.com.' },
  { year: 'Phase 2', title: 'AI Integration', desc: 'Braintiq AI capabilities begin rolling out to businesses with established web presence.' },
  { year: 'Vision', title: 'Digital South Africa', desc: 'A future where every local business has a professional digital presence and AI-powered growth engine.' },
];

export default function AboutPage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="section-padding bg-radial-glow bg-grid relative overflow-hidden">
        <div className="absolute bottom-0 left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-[var(--color-text-secondary)] mb-8">
            <Zap className="w-4 h-4 text-indigo-400" />
            Our Story
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Digitizing <span className="gradient-text">South Africa,</span>{' '}
            One Business at a Time
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            OmnitechWorks was founded on a simple belief: the digital economy should be accessible to every entrepreneur in South Africa — not just those who can afford expensive agencies or have technical knowledge.
          </motion.p>
        </div>
      </section>

      {/* ====== FOUNDER SPOTLIGHT ====== */}
      <section className="section-padding border-b border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <div className="glass-card glow-border p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-full blur-[60px]" />
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center mb-6">
                    <span className="text-3xl font-bold text-white">LS</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">Luthando Sibeko</h3>
                  <p className="text-indigo-400 text-sm font-medium mb-4">Co-Founder, OmnitechWorks</p>
                  <blockquote className="text-[var(--color-text-secondary)] leading-relaxed italic border-l-2 border-indigo-500 pl-4">
                    &ldquo;I saw too many incredible businesses in our communities that the world couldn&apos;t find because they didn&apos;t exist online. OmnitechWorks exists to change that — one website, one automation, one success story at a time.&rdquo;
                  </blockquote>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                The <span className="gradient-text">Vision</span>
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                South Africa has millions of talented entrepreneurs running businesses from their shops, their homes, and their communities. But without a digital presence, they&apos;re invisible to the modern consumer.
              </p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                OmnitechWorks bridges that gap. We don&apos;t just build websites — we build pathways to growth. Our OmniFlow platform automates the entire journey: from getting a business online, to driving customers through AI-powered engagement, to scaling operations with smart automation.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold gradient-text">🇿🇦</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">South African</p>
                </div>
                <div className="text-center">
                  <Globe className="w-6 h-6 text-indigo-400 mx-auto" />
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">Global Tech</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto" />
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">Real Growth</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== VALUES ====== */}
      <section className="section-padding bg-[var(--color-surface-raised)]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              What We <span className="gradient-text">Stand For</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((val, i) => (
              <motion.div key={val.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="glass-card glow-border p-8 group hover:bg-[var(--color-surface-overlay)] transition-colors">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${val.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <val.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{val.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{val.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== TIMELINE ====== */}
      <section className="section-padding border-t border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
          </motion.div>
          <div className="space-y-8 relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-cyan-400 to-emerald-400 opacity-30" />
            {milestones.map((m, i) => (
              <motion.div key={m.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-[var(--color-surface-overlay)] border border-[var(--color-border)] flex items-center justify-center shrink-0 z-10">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                </div>
                <div className="glass-card p-6 flex-1">
                  <p className="text-xs font-mono text-indigo-400 mb-1">{m.year}</p>
                  <h3 className="font-bold mb-2">{m.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{m.desc}</p>
                </div>
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
              Join the Movement
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg mb-8">
              Let&apos;s build your digital future together.
            </p>
            <Link href="/contact" className="btn-primary text-base">
              Get Started Today <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
