import React from 'react';
import { Card } from '../ui/Card';

interface KeySizeComparisonProps {
  algorithms: Array<{
    name: string;
    size: number;
    safe: boolean;
  }>;
}

export const KeySizeComparison: React.FC<KeySizeComparisonProps> = ({ algorithms }) => {
  const maxSize = Math.max(...algorithms.map((a) => a.size));

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-white">Key Size Comparison</h3>

      <div className="space-y-3">
        {algorithms.map((algo, idx) => {
          const percentage = (algo.size / maxSize) * 100;
          return (
            <div key={idx}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-slate-300">{algo.name}</span>
                <span className="font-mono text-slate-600">{algo.size} bits</span>
              </div>
              <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full transition-all ${algo.safe ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              {algo.safe && (
                <p className="mt-1 text-xs text-green-600">✓ Post-Quantum Safe</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
