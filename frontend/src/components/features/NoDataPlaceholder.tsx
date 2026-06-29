import React from 'react';

interface NoDataPlaceholderProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

export const NoDataPlaceholder: React.FC<NoDataPlaceholderProps> = ({ title, message, icon }) => {
  return (
    <div className="rounded-lg border-2 border-dashed border-slate-300 py-12 text-center">
      {icon && <div className="mb-4 text-4xl">{icon}</div>}
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{message}</p>
    </div>
  );
};
