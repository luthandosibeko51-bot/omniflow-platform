'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  CheckCircle2,
  Loader2,
  Sparkles,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  industry: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    industry: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call — In production, this POST to /api/leads
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Track conversion event
    try {
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId: 'contact-form',
          eventType: 'form_submitted',
          metadata: { businessName: formData.businessName },
        }),
      });
    } catch {
      // Non-blocking
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const inputClasses =
    'w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-sm text-white placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors';

  return (
    <>
      {/* ====== HERO ====== */}
      <section className="section-padding bg-radial-glow bg-grid relative overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-[var(--color-text-secondary)] mb-8">
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            Contact Us
          </motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Let&apos;s Build Your{' '}
            <span className="gradient-text">Digital Future</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Tell us about your business and we&apos;ll create a free personalized preview of your future website. No commitment required.
          </motion.p>
        </div>
      </section>

      {/* ====== FORM + INFO ====== */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                Fill out the form and our team will reach out to you within 24 hours with a personalized demo of your business website.
              </p>
            </div>

            <div className="space-y-4">
              <div className="glass-card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">hello@omnitechwork.com</p>
                </div>
              </div>
              <div className="glass-card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">Available upon request</p>
                </div>
              </div>
              <div className="glass-card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">South Africa</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-sm">What Happens Next?</h3>
              </div>
              <ol className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-mono text-xs mt-0.5">01</span>
                  We review your business details
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-mono text-xs mt-0.5">02</span>
                  Our AI generates a personalized website preview
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-mono text-xs mt-0.5">03</span>
                  We send you the demo link within 24 hours
                </li>
              </ol>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="lg:col-span-3">
            {isSubmitted ? (
              <div className="glass-card glow-border p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Thank You!</h3>
                <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
                  We&apos;ve received your details. Our team will review your business and send you a personalized website demo within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card glow-border p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium mb-2">First Name *</label>
                    <input id="firstName" name="firstName" type="text" required placeholder="Luthando"
                      value={formData.firstName} onChange={handleChange} className={inputClasses} />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium mb-2">Last Name *</label>
                    <input id="lastName" name="lastName" type="text" required placeholder="Sibeko"
                      value={formData.lastName} onChange={handleChange} className={inputClasses} />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address *</label>
                  <input id="email" name="email" type="email" required placeholder="you@yourbusiness.co.za"
                    value={formData.email} onChange={handleChange} className={inputClasses} />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                  <input id="phone" name="phone" type="tel" placeholder="+27 XX XXX XXXX"
                    value={formData.phone} onChange={handleChange} className={inputClasses} />
                </div>

                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium mb-2">Business Name *</label>
                  <input id="businessName" name="businessName" type="text" required placeholder="Your Business Name"
                    value={formData.businessName} onChange={handleChange} className={inputClasses} />
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium mb-2">Industry *</label>
                  <select id="industry" name="industry" required value={formData.industry} onChange={handleChange}
                    className={inputClasses}>
                    <option value="">Select your industry</option>
                    <option value="plumbing">Plumbing / Electrical</option>
                    <option value="restaurant">Restaurant / Hospitality</option>
                    <option value="retail">Retail / Shop</option>
                    <option value="salon">Salon / Beauty</option>
                    <option value="construction">Construction / Building</option>
                    <option value="automotive">Automotive / Mechanic</option>
                    <option value="health">Health / Wellness</option>
                    <option value="education">Education / Tutoring</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Tell Us About Your Business</label>
                  <textarea id="message" name="message" rows={4} placeholder="What does your business do? What are your goals?"
                    value={formData.message} onChange={handleChange} className={inputClasses} />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Get My Free Website Preview
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-[var(--color-text-secondary)]">
                  By submitting, you agree to be contacted about our services. We respect your privacy.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
