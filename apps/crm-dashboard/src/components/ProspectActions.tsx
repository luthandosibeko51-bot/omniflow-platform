'use client';

import React from 'react';
import { MoreVertical, ExternalLink, MessageCircle, Trash2 } from 'lucide-react';

interface ProspectActionsProps {
  businessId: string;
  status: string;
  hasWebsite?: boolean;
}

export default function ProspectActions({ businessId, status, hasWebsite }: ProspectActionsProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button 
        onClick={handleToggle}
        className="p-1 hover:bg-white/5 rounded text-[var(--color-text-secondary)] hover:text-white transition"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg glass-card border border-[var(--color-border)] z-50 overflow-hidden">
          <div className="py-1">
            <button 
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-overlay)] transition"
              onClick={() => alert('Log social media outreach for ' + businessId)}
            >
              <MessageCircle className="w-4 h-4 text-cyan-400" />
              Log Social Outreach
            </button>

            <div className="border-t border-[var(--color-border)] my-1"></div>
            
            <button 
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 transition"
              onClick={() => alert('Delete feature coming soon')}
            >
              <Trash2 className="w-4 h-4" />
              Delete Prospect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
