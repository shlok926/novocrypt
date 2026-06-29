import React from 'react';
import { Card } from '../ui/Card';

interface DashboardCardProps {
  title: string;
  count: number;
  icon?: React.ReactNode;
  color?: 'blue' | 'purple' | 'emerald' | 'orange';
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, count, icon, color = 'blue' }) => {
  const bgColors = {
    blue: 'bg-blue-50',
    purple: 'bg-purple-50',
    emerald: 'bg-emerald-50',
    orange: 'bg-orange-50',
  };

  const iconColors = {
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    emerald: 'text-emerald-600',
    orange: 'text-orange-600',
  };

  return (
    <Card variant="default" className={`${bgColors[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-slate-600">{title}</h3>
          <p className="mt-2 text-3xl font-bold text-white">{count}</p>
        </div>
        {icon && <div className={`text-4xl ${iconColors[color]}`}>{icon}</div>}
      </div>
    </Card>
  );
};
