import React from 'react';

interface StatsItem {
  label: string;
  value: string;
  unit?: string;
}

interface StatsSectionProps {
  stats?: StatsItem[];
}

export const StatsSection: React.FC<StatsSectionProps> = ({ 
  stats = [
    { label: 'Years Until Q-Day', value: '9', unit: 'years' },
    { label: 'Organizations at Risk', value: '95', unit: '%' },
    { label: 'Crypto Market Size', value: '$2.8B', unit: 'by 2026' },
    { label: 'US Federal Mandate', value: '2030' },
  ]
}) => {
  return (
    <section className="border-t border-slate-800 bg-transparent py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="mb-2 text-4xl font-bold text-blue-600">{stat.value}</div>
              {stat.unit && <div className="text-sm text-slate-600 mb-1">{stat.unit}</div>}
              <div className="text-sm font-medium text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
