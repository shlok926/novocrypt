import { useEffect, useState } from 'react';
import { getQDayScenarios } from '../../services/qdayService';
import { QDayScenario } from '../../types/qday.types';

export default function QDayScenarios() {
  const [scenarios, setScenarios] = useState<QDayScenario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQDayScenarios()
      .then(setScenarios)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse h-48"></div>
        ))}
      </div>
    );
  }

  const getImpactColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'from-red-500 to-orange-500';
      case 'high':
        return 'from-orange-500 to-yellow-500';
      case 'medium':
        return 'from-yellow-500 to-blue-500';
      default:
        return 'from-blue-500 to-green-500';
    }
  };

  const getIcon = (name: string) => {
    if (name.includes('Optimistic')) return '✅';
    if (name.includes('Expected')) return '⚠️';
    return '🚨';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {scenarios.map((scenario, idx) => (
        <div
          key={idx}
          className={`bg-gradient-to-br ${getImpactColor(
            scenario.impactLevel
          )} bg-opacity-10 rounded-lg border-2 p-6 hover:shadow-lg transition-shadow`}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">{scenario.name}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{scenario.year}</p>
            </div>
            <span className="text-3xl">{getIcon(scenario.name)}</span>
          </div>

          <p className="text-sm text-gray-700 mb-4">{scenario.description}</p>

          <div className="space-y-3 pt-4 border-t border-gray-300 border-opacity-30">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Probability:</span>
              <span className="text-lg font-bold text-gray-900">{scenario.probability}%</span>
            </div>

            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all"
                style={{ width: `${scenario.probability}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-medium text-gray-600 uppercase">Impact:</span>
              <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${
                scenario.impactLevel === 'critical'
                  ? 'bg-red-100 text-red-800'
                  : scenario.impactLevel === 'high'
                    ? 'bg-orange-100 text-orange-800'
                    : scenario.impactLevel === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
              }`}>
                {scenario.impactLevel}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
