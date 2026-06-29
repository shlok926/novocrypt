import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, icon }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </div>
      {subtitle && <p className="mt-2 text-lg text-slate-600">{subtitle}</p>}
    </div>
  );
};
