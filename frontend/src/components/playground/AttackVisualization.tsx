import { useState } from 'react';
import { simulateQuantumAttack } from '../../services/playgroundService';
import { QuantumAttackSimulation } from '../../types/qday.types';

export default function AttackVisualization() {
  const [keySize, setKeySize] = useState(512);
  const [simulation, setSimulation] = useState<QuantumAttackSimulation | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const handleSimulate = async () => {
    setLoading(true);

    try {
      const result = await simulateQuantumAttack(keySize);
      setSimulation(result);
      setExpandedStep(0);
    } catch (error) {
      console.error('Simulation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border-2 border-red-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">⚡ Shor's Algorithm - Quantum Attack</h2>

      {/* Key Size Selector */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Target RSA Key Size</label>
        <select
          value={keySize}
          onChange={(e) => setKeySize(parseInt(e.target.value))}
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value={512}>RSA-512 (Very Weak)</option>
          <option value={1024}>RSA-1024 (Weak)</option>
          <option value={2048}>RSA-2048 (Moderate)</option>
          <option value={4096}>RSA-4096 (Strong, but vulnerable)</option>
        </select>
      </div>

      {/* Simulate Button */}
      <button
        onClick={handleSimulate}
        disabled={loading}
        className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Simulating Attack...' : '🚨 Simulate Quantum Attack'}
      </button>

      {/* Results */}
      {simulation && (
        <div className="mt-6 pt-6 border-t border-red-200 space-y-4">
          {/* Time Estimates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-600 font-semibold uppercase mb-2">Classical Attack</p>
              <p className="text-lg font-bold text-gray-900">{simulation.estimatedTimeClassical}</p>
              <p className="text-xs text-gray-500 mt-1">Brute force factorization</p>
            </div>

            <div className="bg-red-100 rounded-lg p-4 border border-red-300">
              <p className="text-xs text-red-600 font-semibold uppercase mb-2">Quantum Attack</p>
              <p className="text-lg font-bold text-red-900">{simulation.estimatedTimeQuantum}</p>
              <p className="text-xs text-red-700 mt-1">Shor's algorithm</p>
            </div>
          </div>

          {/* Attack Steps */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Attack Steps:</h3>

            <div className="space-y-2">
              {simulation.steps.map((step, idx) => (
                <div key={idx}>
                  <button
                    onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                    className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-start gap-2"
                  >
                    <span className="text-sm font-bold text-blue-600 min-w-[20px]">
                      {idx + 1}.
                    </span>
                    <span className="text-sm text-gray-700 flex-1">{step.split('\n')[0]}</span>
                    <span className="text-sm text-gray-400">{expandedStep === idx ? '▼' : '▶'}</span>
                  </button>

                  {expandedStep === idx && (
                    <div className="mt-1 ml-6 px-3 py-2 bg-blue-50 border-l-2 border-blue-300 text-xs text-gray-700 rounded">
                      {step}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Found Factors */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Factorization Complete! 🎉</h3>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-600 font-semibold">p (Prime Factor 1)</p>
                <p className="font-mono text-gray-900 break-all">{simulation.factors.p}</p>
              </div>

              <div className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-600 font-semibold">q (Prime Factor 2)</p>
                <p className="font-mono text-gray-900 break-all">{simulation.factors.q}</p>
              </div>

              <div className="bg-gray-50 rounded p-2 col-span-2">
                <p className="text-xs text-gray-600 font-semibold">n = p × q (Composite)</p>
                <p className="font-mono text-gray-900 break-all">{simulation.factors.n}</p>
              </div>

              <div className="bg-gray-50 rounded p-2 col-span-2">
                <p className="text-xs text-gray-600 font-semibold">φ(n) = (p-1)(q-1) (Euler's Totient)</p>
                <p className="font-mono text-gray-900 break-all">{simulation.factors.phi}</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
              <strong>✓ Private key recovered!</strong> The attacker can now decrypt all communications
              encrypted with this key.
            </div>
          </div>

          {/* Impact Message */}
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 text-red-900">
            <p className="font-semibold mb-2">Why This Matters:</p>
            <ul className="text-sm space-y-1">
              <li>✗ "Store-and-decrypt-later" attacks are already happening</li>
              <li>✗ Your encrypted data could be vulnerable once Q-Day arrives</li>
              <li>✓ Switch to CRYSTALS-Kyber NOW to protect long-term data</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
