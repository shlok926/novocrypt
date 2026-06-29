import { useEffect, useState } from 'react';
import { getQDayProbability } from '../../services/qdayService';
import { QDayProbability } from '../../types/qday.types';

export default function ProbabilityGauge() {
  const [probability, setProbability] = useState<QDayProbability | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQDayProbability()
      .then(setProbability)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200 p-8 animate-pulse">
        <div className="h-48 bg-purple-200 rounded-full mx-auto"></div>
      </div>
    );
  }

  if (!probability) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
        Failed to load Q-Day probability
      </div>
    );
  }

  const radius = 150;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (probability.probability / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 70) return { bg: 'from-red-500 to-orange-500', text: 'text-red-600' };
    if (score >= 50) return { bg: 'from-orange-500 to-yellow-500', text: 'text-orange-600' };
    if (score >= 30) return { bg: 'from-yellow-500 to-blue-500', text: 'text-yellow-600' };
    return { bg: 'from-blue-500 to-green-500', text: 'text-blue-600' };
  };

  const color = getColor(probability.probability);

  return (
    <div className={`bg-gradient-to-br ${color.bg} bg-opacity-5 rounded-lg border-2 border-purple-200 p-8`}>
      <div className="flex flex-col items-center">
        {/* Circular Gauge */}
        <div className="relative w-80 h-80 flex items-center justify-center">
          <svg width="320" height="320" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="160"
              cy="160"
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="20"
            />
            {/* Progress circle */}
            <circle
              cx="160"
              cy="160"
              r={radius}
              fill="none"
              stroke={
                probability.probability >= 70
                  ? '#ef4444'
                  : probability.probability >= 50
                    ? '#f97316'
                    : probability.probability >= 30
                      ? '#eab308'
                      : '#3b82f6'
              }
              strokeWidth="20"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-5xl font-bold ${color.text}`}>
              {probability.probability}%
            </div>
            <div className="text-sm text-gray-600 mt-2">Q-Day Probability</div>
          </div>
        </div>

        {/* Trend Indicator */}
        <div className="mt-6 flex items-center gap-2">
          <span className="text-2xl">
            {probability.trend === 'increasing'
              ? '📈'
              : probability.trend === 'decreasing'
                ? '📉'
                : '➡️'}
          </span>
          <span className={`font-semibold capitalize ${color.text}`}>
            {probability.trend} trend
          </span>
        </div>

        {/* Factors Breakdown */}
        <div className="mt-8 w-full space-y-3">
          <h3 className="font-bold text-gray-900">Contributing Factors:</h3>
          {Object.entries(probability.factors).map(([factor, score]) => (
            <div key={factor} className="bg-white rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {factor.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-sm font-bold text-gray-900">{Math.round(score as number)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Last Updated */}
        <div className="mt-6 text-xs text-gray-500">
          Last updated: {new Date(probability.lastUpdated).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
