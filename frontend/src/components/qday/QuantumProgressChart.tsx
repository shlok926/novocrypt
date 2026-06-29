import { useEffect, useState } from 'react';
import { getQuantumProgress } from '../../services/qdayService';
import { QuantumMilestone } from '../../types/qday.types';

export default function QuantumProgressChart() {
  const [milestones, setMilestones] = useState<QuantumMilestone[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>('IBM');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuantumProgress()
      .then((data) => {
        setMilestones(data.milestones);
        setSelectedCompany(data.companies[0] || 'IBM');
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const companyMilestones = milestones.filter((m) => m.company === selectedCompany);
  const maxQubits = Math.max(...milestones.map((m) => m.qubitCount), 4000);
  const companies = [...new Set(milestones.map((m) => m.company))];

  if (loading) {
    return <div className="bg-gray-100 rounded-lg p-8 animate-pulse h-96"></div>;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Company Selector */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Select Company:
        </label>
        <div className="flex gap-2 flex-wrap">
          {companies.map((company) => (
            <button
              key={company}
              onClick={() => setSelectedCompany(company)}
              className={`px-4 py-2 rounded font-medium transition-colors ${
                selectedCompany === company
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {company}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="space-y-4">
        {companyMilestones.map((milestone) => (
          <div key={`${milestone.company}-${milestone.year}`}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-semibold text-gray-900">{milestone.year}</div>
                <div className="text-xs text-gray-500">{milestone.milestone}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg text-blue-600">{milestone.qubitCount}</div>
                <div className="text-xs text-gray-500">qubits</div>
              </div>
            </div>

            {/* Bar */}
            <div className="relative w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full flex items-center justify-end pr-3 transition-all duration-500"
                style={{
                  width: `${(milestone.qubitCount / maxQubits) * 100}%`,
                }}
              >
                <span className="text-xs font-bold text-white">
                  {milestone.qubitCount}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Target Line */}
      <div className="mt-8 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-red-500"></div>
            <span className="text-sm font-medium text-gray-700">
              Q-Day Target (4,000+ logical qubits)
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Progress: {Math.round(((companyMilestones[companyMilestones.length - 1]?.qubitCount || 0) / 4000) * 100)}%
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Note:</span> Chart shows physical qubits. Q-Day requires ~4,000
          logical qubits after error correction, which is still years away.
        </p>
      </div>
    </div>
  );
}
