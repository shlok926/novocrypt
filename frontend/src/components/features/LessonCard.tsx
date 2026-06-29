import React from 'react';
import { Card } from '../ui/Card';

interface LessonCardProps {
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon?: React.ReactNode;
  completed?: boolean;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  title,
  description,
  duration,
  difficulty,
  icon,
  completed = false,
}) => {
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-amber-100 text-amber-800',
    advanced: 'bg-red-100 text-red-800',
  };

  return (
    <Card variant={completed ? 'default' : 'default'} className={`cursor-pointer transition-all hover:shadow-lg ${completed ? 'opacity-75' : ''}`}>
      <div className="flex gap-4">
        {icon && (
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
            {icon}
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-white">{title}</h3>
            {completed && (
              <span className="text-xs font-bold text-green-600">✓ COMPLETED</span>
            )}
          </div>

          <p className="mt-1 text-sm text-slate-600">{description}</p>

          <div className="mt-3 flex items-center gap-3">
            <span className={`rounded-full px-2 py-1 text-xs font-medium ${difficultyColors[difficulty]}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
            <span className="text-xs text-slate-500">{duration}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
