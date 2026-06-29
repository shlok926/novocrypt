import React from 'react';
import { Badge } from '../ui/Badge';

interface TimelineItemProps {
  year: number;
  title: string;
  description: string;
  current?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, current = false }) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`h-4 w-4 rounded-full ${current ? 'bg-blue-600' : 'bg-slate-300'}`} />
        <div className="my-2 h-16 w-0.5 bg-gradient-to-b from-slate-300 to-slate-100" />
      </div>
      
      <div className="pb-8">
        <Badge variant={current ? 'default' : 'low'} className="mb-2">
          {year}
        </Badge>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
};
