import React from 'react';

interface RiskMatrixProps {
  data?: Array<{ category: string; value: number; max: number }>;
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({
  data = [
    { category: 'Industry', value: 20, max: 20 },
    { category: 'Data Type', value: 30, max: 30 },
    { category: 'Encryption', value: 20, max: 30 },
    { category: 'Lifetime', value: 15, max: 20 },
  ],
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const maxTotal = data.reduce((sum, item) => sum + item.max, 0);

  return (
    <div className="space-y-4 rounded-lg border border-slate-800 bg-white p-6">
      <h3 className="font-semibold text-white">Risk Score Breakdown</h3>

      <div className="space-y-3">
        {data.map((item, idx) => {
          const percentage = (item.value / item.max) * 100;
          return (
            <div key={idx}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium text-slate-300">{item.category}</span>
                <span className="text-slate-600">{item.value}/{item.max}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-slate-800 pt-3">
        <div className="flex justify-between text-sm font-semibold">
          <span>Total Score</span>
          <span className="text-lg text-blue-600">{total}/100</span>
        </div>
      </div>
    </div>
  );
};
