import { useState } from 'react';
import { getAlgorithmData } from '../../services/playgroundService';
import { AlgorithmRecommendations } from '../../types/qday.types';
import { useEffect } from 'react';

export default function AlgorithmSelector() {
  const [recommendations, setRecommendations] = useState<AlgorithmRecommendations | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAlgorithmData()
      .then(setRecommendations)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="bg-gray-100 rounded-lg p-4 animate-pulse h-40"></div>;
  }

  if (!recommendations) {
    return <div className="bg-red-50 rounded-lg p-4 text-red-800">Failed to load recommendations</div>;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">🎯 Algorithm Recommendations</h2>

      {/* Vulnerable Algorithms */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-red-600 text-lg">✗</span>
          Vulnerable (Breakable by Quantum Computers)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendations.vulnerable.map((algo, idx) => (
            <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">{algo.name}</h4>
              <p className="text-sm text-red-800 mb-3">{algo.vulnerability}</p>

              <div className="bg-red-100 rounded p-2 mb-3">
                <p className="text-xs font-semibold text-red-700 uppercase mb-1">Break Time</p>
                <p className="text-sm font-bold text-red-900">{algo.breakTime}</p>
              </div>

              <p className="text-xs text-red-700 font-semibold uppercase mb-2">Recommended Replacement:</p>
              <div className="bg-white rounded p-2 border border-red-200">
                <p className="text-sm font-mono text-gray-900">{algo.replacement}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safe Algorithms */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-green-600 text-lg">✓</span>
          Quantum-Safe (Use These)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendations.safe.map((algo, idx) => (
            <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">{algo.name}</h4>
              <p className="text-sm text-green-800 mb-3">{algo.details}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-700 font-semibold">Status:</span>
                  <span className="bg-green-200 text-green-900 px-2 py-1 rounded font-semibold">
                    {algo.status}
                  </span>
                </div>
                {algo.recommendation && (
                  <div className="bg-green-100 rounded p-2 border-l-2 border-green-400">
                    <p className="text-xs text-green-900">
                      <strong>💡</strong> {algo.recommendation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Card */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
        <h3 className="font-semibold text-blue-900 mb-3">🚀 Migration Strategy</h3>
        <ol className="text-sm text-blue-800 space-y-2">
          <li><strong>1. Audit:</strong> Identify all cryptographic usage in your systems</li>
          <li><strong>2. Pilot:</strong> Test CRYSTALS-Kyber with non-critical data</li>
          <li><strong>3. Deploy:</strong> Gradually migrate to hybrid RSA-Kyber mode</li>
          <li><strong>4. Transition:</strong> Move completely to Kyber-768+ by 2030</li>
          <li><strong>5. Validate:</strong> Re-encrypt old stored data with quantum-safe algorithms</li>
        </ol>
      </div>
    </div>
  );
}
