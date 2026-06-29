import { useState } from 'react';
import { calculateRiskScore, getRiskLevel, getRecommendations } from '../utils/riskCalculator';

export interface RiskCalculationInput {
  industry: string;
  dataType: string;
  encryption: string;
  dataLifetime: number;
}

export const useRiskCalculator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = (input: RiskCalculationInput) => {
    try {
      setIsLoading(true);
      setError(null);

      const score = calculateRiskScore(
        input.industry,
        input.dataType,
        input.encryption,
        input.dataLifetime
      );

      const level = getRiskLevel(score);
      const recommendations = getRecommendations(level, input.encryption);

      const result = {
        score,
        level,
        recommendations,
        yearsUntilRisk: input.dataLifetime,
      };

      setIsLoading(false);
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Risk calculation failed';
      setError(errorMsg);
      setIsLoading(false);
      return null;
    }
  };

  return {
    isLoading,
    error,
    calculate,
  };
};
