import React from 'react';
import { Card } from '../ui/Card';

interface RiskResultsCardProps {
  score: number;
  level: 'low' | 'medium' | 'high' | 'critical';
  yearsUntilRisk: number;
  description?: string;
}

export const RiskResultsCard: React.FC<RiskResultsCardProps> = ({
  score,
  level,
  yearsUntilRisk,
  description,
}) => {
  const levelLabels = {
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk',
    critical: 'Critical Risk',
  };

  const levelColors = {
    low: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    medium: 'bg-amber-50 border-amber-200 text-amber-900',
    high: 'bg-orange-50 border-orange-200 text-orange-900',
    critical: 'bg-red-50 border-red-200 text-red-900',
  };

  return (
    <Card variant={level === 'critical' ? 'warning' : 'default'} className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-white">Your Risk Assessment</h3>
          <p className="mt-1 text-sm text-slate-600">
            Based on your industry, data type, encryption, and data lifetime
          </p>
        </div>
      </div>

      <div className={`rounded-lg border p-4 ${levelColors[level]}`}>
        <div className="mb-2 text-sm font-medium opacity-75">Risk Level</div>
        <div className="text-2xl font-bold">{levelLabels[level]}</div>
        <div className="mt-2 text-sm opacity-75">
          Score: <strong>{score}/100</strong>
        </div>
      </div>

      <div className="rounded-lg bg-transparent p-4">
        <div className="mb-1 text-sm font-medium text-slate-300">Estimated Time Until Vulnerability</div>
        <div className="text-xl font-bold text-white">{yearsUntilRisk} years</div>
        <p className="mt-2 text-xs text-slate-600">
          If you don't migrate to post-quantum cryptography, your data encrypted today could be vulnerable in {yearsUntilRisk} years.
        </p>
      </div>

      {description && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">
          {description}
        </div>
      )}
    </Card>
  );
};
