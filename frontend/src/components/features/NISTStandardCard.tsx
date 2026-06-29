import React from 'react';
import { Card } from '../ui/Card';
import { CheckCircle } from 'lucide-react';

interface NISTStandardCardProps {
  year: number;
  algorithm: string;
  type: string;
  description: string;
}

export const NISTStandardCard: React.FC<NISTStandardCardProps> = ({
  year,
  algorithm,
  type,
  description,
}) => {
  return (
    <Card variant="highlight" className="space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-white">{algorithm}</h3>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mt-1">
            {type}
          </p>
        </div>
        <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
          {year}
        </div>
      </div>
      
      <p className="text-sm text-slate-600">{description}</p>
      
      <div className="flex items-center gap-2 pt-2 text-xs font-medium text-green-700">
        <CheckCircle className="h-4 w-4" />
        NIST Approved
      </div>
    </Card>
  );
};
