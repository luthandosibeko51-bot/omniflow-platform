'use client';

import React from 'react';
import { Download } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  industry: string;
  status: string;
  createdAt: Date;
}

export default function ExportButton({ businesses }: { businesses: Business[] }) {
  const handleExport = () => {
    if (businesses.length === 0) return;

    const headers = ['ID', 'Name', 'Industry', 'Status', 'Date Added'];
    const csvContent = [
      headers.join(','),
      ...businesses.map(b => 
        `"${b.id}","${b.name}","${b.industry}","${b.status}","${new Date(b.createdAt).toISOString()}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'omniflow_prospects.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      onClick={handleExport}
      className="btn-primary"
    >
      <Download className="w-4 h-4" />
      Export CSV
    </button>
  );
}
