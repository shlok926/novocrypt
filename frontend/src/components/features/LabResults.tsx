import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface LabResultsProps {
  keySize?: string;
  publicKey?: string;
  privateKey?: string;
  modulus?: number;
  classicalTime?: string;
  quantumTime?: string;
  speedup?: string;
}

export const LabResults: React.FC<LabResultsProps> = ({
  keySize,
  publicKey,
  privateKey,
  modulus,
  classicalTime,
  quantumTime,
  speedup,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-white">Results</h3>

      {keySize && (
        <Card variant="default">
          <div className="text-sm text-slate-600">Key Size</div>
          <div className="font-bold text-white text-lg">{keySize}</div>
        </Card>
      )}

      {modulus !== undefined && (
        <Card variant="default">
          <div className="text-sm text-slate-600">Modulus (N)</div>
          <div className="font-mono text-sm font-bold text-white">{modulus.toLocaleString()}</div>
        </Card>
      )}

      {classicalTime && quantumTime && (
        <div className="grid gap-3 sm:grid-cols-2">
          <Card variant="default">
            <div className="text-sm text-slate-600">Classical Time</div>
            <div className="font-bold text-white">{classicalTime}</div>
            <Badge variant="medium" className="mt-2">Classical</Badge>
          </Card>
          <Card variant="highlight">
            <div className="text-sm text-slate-600">Quantum Time</div>
            <div className="font-bold text-purple-600">{quantumTime}</div>
            <Badge variant="critical" className="mt-2">Quantum</Badge>
          </Card>
        </div>
      )}

      {speedup && (
        <Card variant="warning">
          <div className="text-sm text-slate-600">Speedup</div>
          <div className="font-bold text-white text-lg">{speedup}x faster</div>
          <p className="mt-2 text-xs text-slate-600">
            Quantum computers are exponentially faster at breaking RSA encryption
          </p>
        </Card>
      )}
    </div>
  );
};
