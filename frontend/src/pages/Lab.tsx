import React, { useState } from 'react';
import { Card, Button, Input, Badge } from '../components/ui';
import { useRSA } from '../hooks/useRSA';
import { formatNumber, formatTime } from '../utils/formatters';

export const Lab: React.FC = () => {
  const [p, setP] = useState(3);
  const [q, setQ] = useState(5);
  const [e, setE] = useState(5);
  const [keySize, setKeySize] = useState<8 | 16>(8);

  const { generateKeys, runClassicalAttack, runQuantumAttack, isLoading, error } = useRSA();

  const [keyPair, setKeyPair] = useState<any>(null);
  const [classicalResult, setClassicalResult] = useState<any>(null);
  const [quantumResult, setQuantumResult] = useState<any>(null);

  const handleGenerateKeys = () => {
    const result = generateKeys(p, q, e);
    if (result) {
      setKeyPair(result);
    }
  };

  const handleRunBothAttacks = () => {
    if (!keyPair) return;

    const n = keyPair.publicKey.n;
    const classical = runClassicalAttack(n);
    const quantum = runQuantumAttack(n);

    if (classical) setClassicalResult(classical);
    if (quantum) setQuantumResult(quantum);
  };

  return (
    <div className="min-h-screen bg-transparent py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">RSA Algorithm Lab</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Key Generation */}
          <Card>
            <h2 className="text-2xl font-bold text-white mb-6">Generate RSA Keys</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 text-sm">
                Error: {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Key Size: {keySize}-bit
                </label>
                <div className="flex gap-4">
                  <Button
                    variant={keySize === 8 ? 'primary' : 'secondary'}
                    onClick={() => setKeySize(8)}
                  >
                    8-bit
                  </Button>
                  <Button
                    variant={keySize === 16 ? 'primary' : 'secondary'}
                    onClick={() => setKeySize(16)}
                  >
                    16-bit
                  </Button>
                </div>
              </div>

              <Input
                label="Prime P"
                type="number"
                value={p}
                onChange={(e) => setP(Number(e.target.value))}
              />
              <Input
                label="Prime Q"
                type="number"
                value={q}
                onChange={(e) => setQ(Number(e.target.value))}
              />
              <Input
                label="Public Exponent E"
                type="number"
                value={e}
                onChange={(e) => setE(Number(e.target.value))}
              />

              <Button
                onClick={handleGenerateKeys}
                isLoading={isLoading}
                className="w-full"
              >
                Generate Keys
              </Button>
            </div>

            {keyPair && (
              <div className="mt-6 space-y-3 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                <div>
                  <p className="text-sm text-cyan-400">n (modulus):</p>
                  <p className="font-mono text-sm text-slate-300">{formatNumber(keyPair.publicKey.n)}</p>
                </div>
                <div>
                  <p className="text-sm text-cyan-400">φ(n):</p>
                  <p className="font-mono text-sm text-slate-300">{formatNumber(keyPair.phi)}</p>
                </div>
                <div>
                  <p className="text-sm text-cyan-400">Public Key (e, n):</p>
                  <p className="font-mono text-sm text-slate-300">({keyPair.publicKey.e}, {formatNumber(keyPair.publicKey.n)})</p>
                </div>
                <div>
                  <p className="text-sm text-cyan-400">Private Key (d, n):</p>
                  <p className="font-mono text-sm text-slate-300">({keyPair.privateKey.d}, {formatNumber(keyPair.privateKey.n)})</p>
                </div>
              </div>
            )}
          </Card>

          {/* Attack Comparison */}
          <Card>
            <h2 className="text-2xl font-bold text-white mb-6">Attack Comparison</h2>

            {!keyPair && (
              <p className="text-slate-600">Generate keys first to run attacks</p>
            )}

            {keyPair && (
              <>
                <Button
                  onClick={handleRunBothAttacks}
                  isLoading={isLoading}
                  className="w-full mb-6"
                >
                  Run Both Attacks
                </Button>

                <div className="space-y-4">
                  {classicalResult && (
                    <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-white">Classical Attack</h3>
                        <Badge variant="high">Classical</Badge>
                      </div>
                      <p className="text-sm text-slate-300 mb-2">Time: {formatTime(classicalResult.time)}</p>
                      <p className="text-sm text-slate-300">Factors: {classicalResult.factors.join(', ')}</p>
                    </div>
                  )}

                  {quantumResult && (
                    <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-white">Quantum Attack (Shor's)</h3>
                        <Badge variant="critical">Quantum</Badge>
                      </div>
                      <p className="text-sm text-slate-300 mb-2">Steps: {quantumResult.steps}</p>
                      <p className="text-sm text-slate-300 mb-2">Time: {formatTime(quantumResult.time)}</p>
                      <p className="text-sm text-slate-300">Period: {quantumResult.period}</p>
                    </div>
                  )}

                  {classicalResult && quantumResult && (
                    <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                      <p className="text-sm font-semibold text-cyan-400">
                        Speedup: {quantumResult.time > 0 ? (classicalResult.time / quantumResult.time).toFixed(1) + 'x faster with quantum' : 'Near-instantaneous quantum advantage!'}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
