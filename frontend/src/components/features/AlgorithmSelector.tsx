import React from 'react';

interface AlgorithmSelectorProps {
  algorithms: Array<{ id: string; name: string; description: string }>;
  selected?: string;
  onChange?: (id: string) => void;
}

export const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  algorithms,
  selected,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">Select Algorithm</label>
      <div className="space-y-2">
        {algorithms.map((algo) => (
          <button
            key={algo.id}
            onClick={() => onChange?.(algo.id)}
            className={`w-full rounded-lg border-2 p-3 text-left transition-all ${
              selected === algo.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-slate-800 bg-white hover:border-slate-300'
            }`}
          >
            <h4 className="font-medium text-white">{algo.name}</h4>
            <p className="text-xs text-slate-600">{algo.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
