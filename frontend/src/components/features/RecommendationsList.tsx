import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface RecommendationsListProps {
  recommendations?: string[];
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
}

export const RecommendationsList: React.FC<RecommendationsListProps> = ({
  recommendations = [],
  riskLevel = 'high',
}) => {
  const defaultRecommendations = {
    low: [
      'Continue monitoring quantum threat landscape',
      'Keep encryption standards updated',
      'Review legacy systems annually',
    ],
    medium: [
      'Begin planning post-quantum migration',
      'Audit current encryption systems',
      'Evaluate quantum-safe algorithm options',
    ],
    high: [
      'Prioritize post-quantum cryptography migration',
      'Implement hybrid encryption (classical + quantum-safe)',
      'Identify long-lived data requiring re-encryption',
    ],
    critical: [
      'Urgent: Initiate quantum-safe migration roadmap',
      'Deploy post-quantum algorithms immediately',
      'Identify and protect sensitive long-term data',
      'Establish quantum readiness task force',
    ],
  };

  const items = recommendations.length > 0 ? recommendations : defaultRecommendations[riskLevel];

  return (
    <Card variant="default" className="space-y-4">
      <h3 className="font-semibold text-white">Recommendations</h3>
      
      <ul className="space-y-3">
        {items.map((rec, idx) => (
          <li key={idx} className="flex gap-3">
            <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
              <span className="text-xs font-semibold text-blue-600">{idx + 1}</span>
            </div>
            <span className="text-sm text-slate-300">{rec}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};
