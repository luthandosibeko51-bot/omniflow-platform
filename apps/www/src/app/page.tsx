'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Globe,
  Sparkles,
  ArrowRight,
  BarChart3,
  MessageSquare,
  Rocket,
  CheckCircle2,
  Users,
  TrendingUp,
  Shield,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

const stats = [
  { label: 'Businesses Lack Websites in SA', value: '70%', icon: Globe },
  { label: 'Increase in Leads with a Website', value: '3x', icon: TrendingUp },
  { label: 'Faster Deployment Time', value: '10x', icon: Rocket },
];

const steps = [
  {
    step: '01',
    title: 'We Build Your Website',
    description:
      'A stunning, mobile-optimized professional website tailored to your business. No technical knowledge needed.',
    icon: Globe,
    color: 'from-indigo-500 to-violet-600',
  },
  {
    step: '02',
    title: 'We Drive Your Customers',
    description:
      'AI-powered lead generation, SEO optimization, and local search visibility to bring customers to your door.',
    icon: BarChart3,
    color: 'from-cyan-500 to-blue-600',
  },
  {
    step: '03',
    title: 'We Automate Your Growth',
    description:
      'Intelligent chatbots, automated bookings, and smart CRM systems so you focus on what you do best.',
    icon: Sparkles,
    color: 'from-emerald-500 to-teal-600',
  },
];

const features = [
  { text: 'Professional website in days, not months', icon: CheckCircle2 },
  { text: 'Mobile-first, fast-loading designs', icon: CheckCircle2 },
  { text: 'AI-powered customer engagement', icon: CheckCircle2 },
  { text: 'Built for South African businesses', icon: CheckCircle2 },
  { text: 'Affordable, transparent pricing', icon: CheckCircle2 },
  { text: 'Ongoing support & optimization', icon: CheckCircle2 },
];

export default function HomePage() {
  return (
    <>
      {/* ====== HERO SECTION ====== */}
      <section className="relative overflow-hidden section-padding bg-grid bg-radial-glow">
        {/* Animated orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }} />

        <div className="relative max-w-6xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-[var(--color-text-secondary)] mb-8"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Powered by OmnitechWorks
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
          >
            Step Into the{' '}
            <span className="gradient-text">Digital Age.</span>
            <br />
            <span className="text-[var(--color-text-secondary)]">
              We Build Your Online Presence,
            </span>
            <br />
            You Build Your Business.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            OmniFlow takes your South African business from invisible to
            unstoppable. First a professional website, then AI-powered
            growth — all handled for you.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact" className="btn-primary text-base">
              Get Your Free Website Preview
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/services" className="btn-secondary text-base">
              See How It Works
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ====== STATS BAR ====== */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-raised)]">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center shrink-0">
                <stat.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section className="section-padding relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Zero to Online in{' '}
              <span className="gradient-text">Three Steps</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
              We handle everything so you can focus on running your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="glass-card glow-border p-8 group hover:bg-[var(--color-surface-overlay)] transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-mono text-indigo-400 mb-2">Step {step.step}</p>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FEATURES LIST ====== */}
      <section className="section-padding bg-[var(--color-surface-raised)] border-y border-[var(--color-border)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Why South African Businesses{' '}
              <span className="gradient-text">Choose Us</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <motion.div
                key={feat.text}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="flex items-center gap-3 glass-card p-5"
              >
                <feat.icon className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-medium">{feat.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="section-padding relative bg-radial-glow">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center mx-auto mb-8">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Take Your Business{' '}
              <span className="gradient-text">Online?</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg mb-10 max-w-xl mx-auto">
              Join hundreds of South African businesses that have already made
              the leap. Get a free preview of your future website today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-base">
                Get Started for Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/about" className="btn-secondary text-base">
                Learn About Our Vision
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
