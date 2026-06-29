import { useEffect, useState } from 'react';
import { getEncryptionSpeeds } from '../../services/playgroundService';
import { AlgorithmSpeed } from '../../types/qday.types';

export default function SpeedComparison() {
  const [speeds, setSpeeds] = useState<AlgorithmSpeed[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEncryptionSpeeds()
      .then(setSpeeds)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="bg-gray-100 rounded-lg p-4 animate-pulse h-40"></div>;
  }

  const maxTime = Math.max(...speeds.map((s) => s.estimatedTimeMs), 1);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">⚙️ Encryption Speed Comparison</h2>

      <div className="space-y-4">
        {speeds.map((algo, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{algo.algorithm}</h3>
                <p className="text-xs text-gray-600">
                  {algo.keySize}-bit •{' '}
                  {algo.quantumVulnerable ? (
                    <span className="text-red-600 font-semibold">Quantum Vulnerable ⚠️</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Quantum-Safe ✓</span>
                  )}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{algo.estimatedTimeMs}ms</p>
                <p className="text-xs text-gray-500">{algo.estimatedTimeMs < 50 ? 'Fast' : 'Slower'}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all ${
                  algo.quantumVulnerable
                    ? 'bg-gradient-to-r from-red-500 to-orange-500'
                    : 'bg-gradient-to-r from-green-500 to-blue-500'
                }`}
                style={{ width: `${(algo.estimatedTimeMs / maxTime) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200 bg-blue-50 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">💡 Key Findings:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✓ Post-quantum algorithms (Kyber) are nearly as fast as current RSA</li>
          <li>✓ Encryption speed is NOT a blocker for quantum-safe migration</li>
          <li>✓ Start using Kyber-768 now - it's production-ready</li>
        </ul>
      </div>
    </div>
  );
}
