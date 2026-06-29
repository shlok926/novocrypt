export const calculateRiskScore = (
  industry: string,
  dataType: string,
  encryption: string,
  dataLifetime: number
): number => {
  const RISK_WEIGHTS = {
    industry: 0.2,
    dataType: 0.3,
    encryption: 0.3,
    dataLifetime: 0.2,
  };

  const industryScores: Record<string, number> = {
    healthcare: 85,
    finance: 90,
    government: 95,
    tech: 60,
    retail: 40,
    education: 50,
    other: 55,
  };

  const dataTypeScores: Record<string, number> = {
    personal: 60,
    financial: 85,
    medical: 95,
    government: 100,
    intellectual: 75,
    communications: 70,
  };

  const encryptionScores: Record<string, number> = {
    'rsa-2048': 85,
    'rsa-4096': 70,
    'ecc-256': 75,
    'ecc-384': 60,
    unknown: 95,
  };

  const lifetimeScores: Record<number, number> = {
    5: 30,
    10: 50,
    25: 80,
    50: 90,
    100: 100,
  };

  const industryScore = industryScores[industry] || 50;
  const dataTypeScore = dataTypeScores[dataType] || 50;
  const encryptionScore = encryptionScores[encryption] || 50;
  const lifetimeScore = lifetimeScores[dataLifetime] || 50;

  const totalScore =
    industryScore * RISK_WEIGHTS.industry +
    dataTypeScore * RISK_WEIGHTS.dataType +
    encryptionScore * RISK_WEIGHTS.encryption +
    lifetimeScore * RISK_WEIGHTS.dataLifetime;

  return Math.round(totalScore);
};

export const getRiskLevel = (score: number): 'Low' | 'Medium' | 'High' | 'Critical' => {
  if (score <= 25) return 'Low';
  if (score <= 50) return 'Medium';
  if (score <= 75) return 'High';
  return 'Critical';
};

export const getRecommendations = (
  riskLevel: string,
  encryption: string
): string[] => {
  const baseRecommendations: Record<string, string[]> = {
    Low: [
      'Monitor quantum developments regularly',
      'Include post-quantum crypto in future roadmap',
    ],
    Medium: [
      'Start post-quantum migration planning in next 2 years',
      'Pilot test post-quantum algorithms',
      'Evaluate NIST-approved algorithms',
    ],
    High: [
      'Initiate post-quantum migration immediately',
      'Replace RSA with hybrid encryption',
      'Implement CRYSTALS-Kyber for key exchange',
      'Plan migration timeline for next 12 months',
    ],
    Critical: [
      'Emergency post-quantum migration required',
      'Deploy hybrid encryption immediately',
      'Implement CRYSTALS-Kyber and Dilithium now',
      'Develop crisis response plan',
      'Consider data re-encryption strategy',
    ],
  };

  return baseRecommendations[riskLevel] || [];
};
