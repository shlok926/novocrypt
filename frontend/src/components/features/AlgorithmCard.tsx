import React from 'react';
import { Card } from '../ui/Card';

interface AlgorithmCardProps {
  name: string;
  category: 'classical' | 'post-quantum';
  keySize: number;
  securityLevel: string;
  description: string;
  postQuantumSafe: boolean;
}

export const AlgorithmCard: React.FC<AlgorithmCardProps> = ({
  name,
  category,
  keySize,
  securityLevel,
  description,
  postQuantumSafe,
}) => {
  return (
    <Card variant={postQuantumSafe ? 'highlight' : 'default'} className="space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-white">{name}</h3>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mt-1">
            {category}
          </p>
        </div>
        {postQuantumSafe && (
          <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
            Safe
          </div>
        )}
      </div>

      <p className="text-sm text-slate-600">{description}</p>

      <div className="space-y-2 rounded-lg bg-transparent p-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Key Size:</span>
          <span className="font-medium text-white">{keySize} bits</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Security:</span>
          <span className="font-medium text-white">{securityLevel}</span>
        </div>
      </div>
    </Card>
  );
};
