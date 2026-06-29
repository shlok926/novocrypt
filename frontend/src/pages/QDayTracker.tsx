import ProbabilityGauge from '../components/qday/ProbabilityGauge';
import QuantumProgressChart from '../components/qday/QuantumProgressChart';
import ExpertPredictions from '../components/qday/ExpertPredictions';
import QDayScenarios from '../components/qday/QDayScenarios';

export default function QDayTracker() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Q-Day Tracker</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track quantum computing progress and estimate when cryptographically relevant quantum computers
            (CRQC) will emerge. Understand the timeline for Q-Day and plan your migration accordingly.
          </p>
        </div>

        {/* Probability Gauge - Main Focus */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Q-Day Probability</h2>
          <ProbabilityGauge />
        </section>

        {/* Timeline Scenarios */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Possible Timelines</h2>
          <QDayScenarios />

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">📊 What This Means</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>
                <strong>Optimistic (20%):</strong> Q-Day delayed to 2043+ due to technical challenges
              </li>
              <li>
                <strong>Expected (55%):</strong> Q-Day arrives ~2035 as predicted by NSA & experts
              </li>
              <li>
                <strong>Pessimistic (25%):</strong> Major breakthrough accelerates Q-Day to 2028
              </li>
            </ul>
          </div>
        </section>

        {/* Quantum Progress */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quantum Computing Progress</h2>
          <QuantumProgressChart />

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
              <p className="text-xs text-blue-600 font-semibold uppercase mb-1">Current Progress</p>
              <p className="text-2xl font-bold text-blue-900">~1,400 qubits</p>
              <p className="text-xs text-blue-700 mt-1">IBM Heron (2024)</p>
            </div>

            <div className="bg-orange-50 rounded-lg border border-orange-200 p-4">
              <p className="text-xs text-orange-600 font-semibold uppercase mb-1">Q-Day Target</p>
              <p className="text-2xl font-bold text-orange-900">~4,000 qubits</p>
              <p className="text-xs text-orange-700 mt-1">Logical qubits needed</p>
            </div>

            <div className="bg-green-50 rounded-lg border border-green-200 p-4">
              <p className="text-xs text-green-600 font-semibold uppercase mb-1">Progress Rate</p>
              <p className="text-2xl font-bold text-green-900">~35% / year</p>
              <p className="text-xs text-green-700 mt-1">Qubit doubling trend</p>
            </div>
          </div>
        </section>

        {/* Expert Predictions */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Expert Predictions</h2>
          <ExpertPredictions />

          <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="font-semibold text-purple-900 mb-3">🎯 Key Insights</h3>
            <ul className="text-sm text-purple-800 space-y-2">
              <li>✓ Consensus: Q-Day likely between 2030-2040</li>
              <li>✓ NSA and NIST recommend urgent migration starting now</li>
              <li>✓ Post-quantum standards finalized (CRYSTALS-Kyber, Dilithium)</li>
              <li>✓ Organizations should begin assessment and planning phase</li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Protect Your Data?</h2>
          <p className="text-lg mb-6 opacity-90">
            Don't wait for Q-Day. Start your quantum-safe migration today with Novocrypt.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Get Migration Plan
            </button>
            <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
              Run Risk Assessment
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
