import React from 'react';

interface AlgorithmTableProps {
  algorithms: Array<{
    id: string;
    name: string;
    category: string;
    keySize: number;
    securityLevel: string;
    postQuantumSafe: boolean;
  }>;
}

export const AlgorithmTable: React.FC<AlgorithmTableProps> = ({ algorithms }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-800">
      <table className="w-full">
        <thead className="bg-transparent">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-white">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-white">Category</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-white">Key Size</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-white">Security Level</th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-white">Post-Quantum Safe</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {algorithms.map((algo) => (
            <tr key={algo.id} className="hover:bg-transparent">
              <td className="px-6 py-4 text-sm font-medium text-white">{algo.name}</td>
              <td className="px-6 py-4 text-sm text-slate-300 capitalize">{algo.category}</td>
              <td className="px-6 py-4 text-sm text-slate-300">{algo.keySize} bits</td>
              <td className="px-6 py-4 text-sm text-slate-300">{algo.securityLevel}</td>
              <td className="px-6 py-4 text-center">
                {algo.postQuantumSafe ? (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
                    ✓
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-bold text-red-700">
                    ✗
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
