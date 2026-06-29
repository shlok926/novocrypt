import { useState } from 'react';
import EncryptionPanel from '../components/playground/EncryptionPanel';
import AttackVisualization from '../components/playground/AttackVisualization';
import SpeedComparison from '../components/playground/SpeedComparison';
import AlgorithmSelector from '../components/playground/AlgorithmSelector';

export default function Playground() {
  const [activeTab, setActiveTab] = useState<'encrypt' | 'attack' | 'compare' | 'algorithms'>('encrypt');

  const tabs = [
    { id: 'encrypt', label: '🔐 Encrypt', icon: '🔒' },
    { id: 'attack', label: '⚡ Quantum Attack', icon: '💥' },
    { id: 'compare', label: '⚙️ Speed Test', icon: '⏱️' },
    { id: 'algorithms', label: '🎯 Algorithms', icon: '📋' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">🎮 Quantum Playground</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Interactive demonstrations of quantum computing threats and post-quantum cryptography solutions.
            See how quantum computers will break current encryption.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 flex-wrap justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Info Bar */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-900">
            <strong>💡 Educational Tool:</strong> This playground demonstrates real quantum threats using
            simulations. All cryptographic operations are educational.
          </p>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'encrypt' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EncryptionPanel />
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">💭 How It Works</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">🔒 RSA Encryption</h4>
                    <p>Uses mathematical factorization. Currently secure, but vulnerable to quantum Shor's algorithm.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">🛡️ Kyber Encryption</h4>
                    <p>Based on lattice problems. Resistant to both classical and quantum attacks.</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-4">
                    <p className="text-yellow-900">
                      <strong>⚠️ Important:</strong> This demo uses simplified key sizes for visualization.
                      Production systems require much larger keys.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attack' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <AttackVisualization />
              </div>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">⚡ Shor's Algorithm</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <h4 className="font-semibold text-red-900 mb-1">What is it?</h4>
                    <p>
                      A quantum algorithm that can efficiently factor large numbers - the mathematical basis of
                      RSA security.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-900 mb-1">Speed Advantage</h4>
                    <p>
                      Classical: Years to centuries. Quantum: Hours to days with sufficient qubits.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-900 mb-1">Timeline</h4>
                    <p>
                      NSA: 2030-2040. This is not distant future - organizations must act now.
                    </p>
                  </div>
                  <div className="bg-red-100 border border-red-300 rounded p-3">
                    <p className="text-red-900 font-semibold text-xs uppercase">Store & Decrypt Later</p>
                    <p className="text-red-800 text-xs mt-1">
                      Adversaries are collecting encrypted data TODAY to decrypt when quantum computers arrive.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'compare' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SpeedComparison />
              </div>
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">⏱️ Performance</h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Speed Equivalent?</h4>
                    <p>
                      Yes! Post-quantum algorithms are nearly as fast as current RSA. Performance is NOT a
                      blocker.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Key Size Trade-off</h4>
                    <p>
                      Kyber keys are larger (~1KB vs RSA ~512B), but still manageable in practice.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Conclusion</h4>
                    <p>
                      Switching to Kyber has minimal performance impact. Start transitioning now.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'algorithms' && (
            <AlgorithmSelector />
          )}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Implement?</h2>
          <p className="text-lg mb-6 opacity-90">
            Understand the threat. Now implement the solution with Novocrypt.
          </p>
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Start Your Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
