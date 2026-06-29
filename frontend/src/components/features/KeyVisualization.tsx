import React from 'react';

interface KeyVisualizationProps {
  modulus?: number;
  publicExponent?: number;
  privateExponent?: number;
  phi?: number;
}

export const KeyVisualization: React.FC<KeyVisualizationProps> = ({
  modulus,
  publicExponent,
  privateExponent,
  phi,
}) => {
  return (
    <div className="space-y-4 rounded-lg border border-slate-800 bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <h3 className="font-semibold text-white">Key Components Visualization</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        {modulus !== undefined && (
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-widest text-slate-500">Modulus (n)</div>
            <div className="mt-2 font-mono text-lg font-bold text-white">{modulus.toLocaleString()}</div>
          </div>
        )}

        {publicExponent !== undefined && (
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-widest text-slate-500">Public Exponent (e)</div>
            <div className="mt-2 font-mono text-lg font-bold text-blue-600">{publicExponent}</div>
          </div>
        )}

        {privateExponent !== undefined && (
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-widest text-slate-500">Private Exponent (d)</div>
            <div className="mt-2 font-mono text-lg font-bold text-red-600">{privateExponent}</div>
          </div>
        )}

        {phi !== undefined && (
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase tracking-widest text-slate-500">Phi (φ)</div>
            <div className="mt-2 font-mono text-lg font-bold text-white">{phi.toLocaleString()}</div>
          </div>
        )}
      </div>

      <div className="rounded-lg bg-blue-100 p-3 text-sm text-blue-900">
        <strong>How it works:</strong> The public key (e, n) is shared openly. The private key (d, n) is kept secret. 
        The security relies on the difficulty of factorizing n back into its prime factors.
      </div>
    </div>
  );
};
