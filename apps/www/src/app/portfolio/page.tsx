'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Star, CheckCircle2 } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

const projects = [
  {
    name: 'Mzansi Plumbing Solutions',
    industry: 'Professional Services',
    description: 'A complete digital transformation for a local plumbing service, featuring an automated booking system and WhatsApp integration.',
    image: 'https://images.unsplash.com/photo-1581561515458-3e5f2dc70a93?q=80&w=800&auto=format&fit=crop',
    results: ['200% increase in online bookings', 'Zero missed inquiries'],
    color: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    name: 'Soweto Auto Clinic',
    industry: 'Automotive',
    description: 'A modern, fast-loading website showcasing services and allowing customers to get instant quotes through an AI chatbot.',
    image: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=800&auto=format&fit=crop',
    results: ['Automated 24/7 quote generation', 'Top 3 ranking for local SEO'],
    color: 'from-orange-500/20 to-red-500/20',
    iconColor: 'text-orange-400',
  },
  {
    name: 'Cape Town Boutique',
    industry: 'Retail',
    description: 'A sleek and visually stunning digital storefront designed to attract foot traffic and showcase seasonal collections.',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop',
    results: ['3x increase in store foot traffic', 'Engaged local audience'],
    color: 'from-pink-500/20 to-rose-500/20',
    iconColor: 'text-pink-400',
  },
  {
    name: 'Durban Delights',
    industry: 'Restaurant & Hospitality',
    description: 'A beautiful, mouth-watering website with integrated table reservations and an interactive menu.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    results: ['Fully booked weekends', 'Streamlined reservation process'],
    color: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
  },
];

export default function PortfolioPage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="section-padding bg-radial-glow bg-grid relative overflow-hidden">
        <div className="absolute top-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-[var(--color-text-secondary)] mb-8">
            <Star className="w-4 h-4 text-indigo-400" />
            Our Work
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Real Businesses, <span className="gradient-text">Real Results</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            See how OmniFlow is transforming South African businesses with world-class digital presences and intelligent AI automation.
          </motion.p>
        </div>
      </section>

      {/* ====== PORTFOLIO GRID ====== */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto space-y-16">
          {projects.map((project, index) => (
            <motion.div 
              key={project.name}
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }} 
              variants={fadeUp} 
              custom={0}
              className="glass-card glow-border overflow-hidden"
            >
              <div className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Image Section */}
                <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} mix-blend-overlay z-10 transition-opacity group-hover:opacity-0 duration-500`} />
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Content Section */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[var(--color-surface-raised)]/50">
                  <p className={`text-sm font-mono mb-3 ${project.iconColor}`}>{project.industry}</p>
                  <h2 className="text-3xl font-bold mb-4">{project.name}</h2>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">
                    {project.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">The Impact</h3>
                    {project.results.map((result, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className={`w-5 h-5 ${project.iconColor}`} />
                        <span className="text-sm text-[var(--color-text-secondary)]">{result}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-indigo-400 transition-colors group">
                      Get similar results
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="section-padding bg-[var(--color-surface-raised)] border-t border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Be Our Next <span className="gradient-text">Success Story?</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg mb-8">
              Get a free, personalized demo of your future website and let's start growing your business.
            </p>
            <Link href="/contact" className="btn-primary text-base">
              Get Your Free Preview <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
