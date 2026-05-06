import React from 'react';
import Link from 'next/link';
import { Zap, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Omni<span className="gradient-text">Flow</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Empowering South African businesses with professional websites and AI-powered growth solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-4">Navigation</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-4">Solutions</h4>
            <ul className="space-y-3">
              {['Professional Websites', 'AI Chatbots', 'Lead Generation', 'Business Automation'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-[var(--color-text-secondary)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                <Mail className="w-4 h-4 text-indigo-400" />
                hello@omnitechwork.com
              </li>
              <li className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                <MapPin className="w-4 h-4 text-indigo-400" />
                South Africa
              </li>
              <li className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                <Phone className="w-4 h-4 text-indigo-400" />
                Contact via form
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--color-text-secondary)]">
            &copy; {new Date().getFullYear()} OmnitechWorks. All rights reserved. Powered by OmniFlow.
          </p>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Built with 🇿🇦 pride for South African businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}
