import React from 'react';

interface InfoCardProps {
  title?: string;
  content: string | React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'info' | 'warning' | 'success' | 'error';
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, content, icon, variant = 'info' }) => {
  const styles = {
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    success: 'bg-green-50 border-green-200 text-green-900',
    error: 'bg-red-50 border-red-200 text-red-900',
  };

  return (
    <div className={`rounded-lg border p-4 ${styles[variant]}`}>
      <div className="flex gap-3">
        {icon && <div className="flex-shrink-0 text-xl">{icon}</div>}
        <div className="flex-1">
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <div className="text-sm">{content}</div>
        </div>
      </div>
    </div>
  );
};
