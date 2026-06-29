import React from 'react';
import { Card } from '../ui/Card';

interface AttackResultsProps {
  attackType: 'classical' | 'quantum';
  steps?: number;
  timeMs?: number;
  factors?: number[];
  message?: string;
}

export const AttackResults: React.FC<AttackResultsProps> = ({
  attackType,
  steps,
  timeMs,
  factors,
  message,
}) => {
  const isQuantum = attackType === 'quantum';

  return (
    <Card variant={isQuantum ? 'highlight' : 'default'} className="space-y-4">
      <h3 className="font-semibold text-white">
        {isQuantum ? 'Quantum Attack Results' : 'Classical Attack Results'}
      </h3>

      <div className="space-y-3">
        {steps !== undefined && (
          <div className="flex justify-between rounded-lg bg-transparent p-3">
            <span className="text-sm text-slate-600">Steps:</span>
            <span className="font-mono font-bold text-white">{steps.toLocaleString()}</span>
          </div>
        )}

        {timeMs !== undefined && (
          <div className="flex justify-between rounded-lg bg-transparent p-3">
            <span className="text-sm text-slate-600">Time:</span>
            <span className="font-mono font-bold text-white">{timeMs.toFixed(2)}ms</span>
          </div>
        )}

        {factors && factors.length > 0 && (
          <div className="flex justify-between rounded-lg bg-green-50 p-3">
            <span className="text-sm text-slate-600">Factors Found:</span>
            <span className="font-mono font-bold text-green-700">{factors.join(' × ')}</span>
          </div>
        )}
      </div>

      {message && (
        <div className={`rounded-lg p-3 text-sm ${isQuantum ? 'bg-purple-50 text-purple-900' : 'bg-blue-50 text-blue-900'}`}>
          {message}
        </div>
      )}
    </Card>
  );
};
