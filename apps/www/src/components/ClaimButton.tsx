'use client';

import React, { useState } from 'react';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';

interface ClaimButtonProps {
  businessId: string;
}

export default function ClaimButton({ businessId }: ClaimButtonProps) {
  const [status, setStatus] = useState<'idle' | 'claiming' | 'success' | 'error'>('idle');

  const handleClaim = async () => {
    setStatus('claiming');
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessId }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white font-bold rounded-full animate-in zoom-in duration-300">
        <CheckCircle2 className="w-5 h-5" />
        Website Claimed!
      </div>
    );
  }

  return (
    <button
      onClick={handleClaim}
      disabled={status === 'claiming'}
      className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform disabled:opacity-50 flex items-center gap-2"
    >
      {status === 'claiming' ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Sparkles className="w-5 h-5 text-indigo-600" />
          Claim This Website
        </>
      )}
    </button>
  );
}
