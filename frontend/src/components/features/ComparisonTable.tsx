import React from 'react';

interface ComparisonTableProps {
  algorithms: Array<{
    name: string;
    keySize: number;
    classicalComplexity: string;
    quantumComplexity: string;
    postQuantumSafe: boolean;
  }>;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ algorithms }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-800">
      <table className="w-full">
        <thead className="bg-transparent">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-white">Algorithm</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-white">Key Size</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-white">Classical</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-white">Quantum</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-white">Post-Quantum</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {algorithms.map((algo, idx) => (
            <tr key={idx} className="hover:bg-transparent">
              <td className="px-6 py-4 text-sm font-medium text-white">{algo.name}</td>
              <td className="px-6 py-4 text-sm text-slate-300">{algo.keySize} bits</td>
              <td className="px-6 py-4 text-sm text-slate-300 font-mono">{algo.classicalComplexity}</td>
              <td className="px-6 py-4 text-sm text-slate-300 font-mono">{algo.quantumComplexity}</td>
              <td className="px-6 py-4 text-sm">
                {algo.postQuantumSafe ? (
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
                    ✓ Safe
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-700">
                    ✗ Vulnerable
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
