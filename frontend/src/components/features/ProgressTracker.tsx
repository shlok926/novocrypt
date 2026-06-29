import React from 'react';

interface ProgressTrackerProps {
  current: number;
  total: number;
  label?: string;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ current, total, label }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium text-slate-300">{label}</p>}
      <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-slate-600">
        {current} of {total} ({Math.round(percentage)}%)
      </p>
    </div>
  );
};
