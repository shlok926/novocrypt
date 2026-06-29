import { useEffect, useState } from 'react';
import { getExpertPredictions } from '../../services/qdayService';
import { ExpertPrediction } from '../../types/qday.types';

export default function ExpertPredictions() {
  const [predictions, setPredictions] = useState<ExpertPrediction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExpertPredictions()
      .then(setPredictions)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse h-48"></div>
        ))}
      </div>
    );
  }

  const sortedByConfidence = [...predictions].sort((a, b) => b.confidence - a.confidence);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {sortedByConfidence.map((pred, idx) => (
        <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-semibold text-gray-900">{pred.name}</h4>
              <p className="text-xs text-gray-600">{pred.organization}</p>
            </div>
            <span className="text-2xl">🧑‍🔬</span>
          </div>

          <p className="text-sm text-gray-700 mb-3">{pred.prediction}</p>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-600">Timeline:</span>
              <span className="text-xs font-bold bg-purple-100 text-purple-900 px-2 py-1 rounded">
                {pred.timeline}
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-600">Confidence:</span>
                <span className="text-xs font-bold text-purple-600">{pred.confidence}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    pred.confidence >= 75
                      ? 'bg-green-500'
                      : pred.confidence >= 50
                        ? 'bg-yellow-500'
                        : 'bg-blue-500'
                  }`}
                  style={{ width: `${pred.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
