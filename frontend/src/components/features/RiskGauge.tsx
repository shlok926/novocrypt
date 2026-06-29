import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface RiskGaugeProps {
  score: number;
  maxScore?: number;
  level?: 'low' | 'medium' | 'high' | 'critical';
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, maxScore = 100, level = 'high' }) => {
  const percentage = (score / maxScore) * 100;
  
  const levelColors = {
    low: 'text-emerald-600',
    medium: 'text-amber-600',
    high: 'text-orange-600',
    critical: 'text-red-600',
  };

  const gaugeColors = {
    low: 'from-emerald-400 to-emerald-600',
    medium: 'from-amber-400 to-amber-600',
    high: 'from-orange-400 to-orange-600',
    critical: 'from-red-400 to-red-600',
  };

  return (
    <Card variant="default" className="flex flex-col items-center space-y-4">
      <h3 className="font-semibold text-white">Risk Score</h3>
      
      {/* Gauge */}
      <div className="relative h-40 w-40">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          {/* Background arc */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8" />
          
          {/* Progress arc */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={`url(#gradient-${level})`}
            strokeWidth="8"
            strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
          
          <defs>
            <linearGradient id={`gradient-${level}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#' + { low: '10b981', medium: 'f59e0b', high: 'f97316', critical: 'dc2626' }[level] }} />
              <stop offset="100%" style={{ stopColor: '#' + { low: '059669', medium: 'd97706', high: 'ea580c', critical: '991b1b' }[level] }} />
            </linearGradient>
          </defs>

          {/* Center text */}
          <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold" fill="currentColor">
            {score}
          </text>
        </svg>
      </div>

      {/* Label */}
      <Badge variant={level}>{level.toUpperCase()}</Badge>
    </Card>
  );
};
