export const RISK_LEVELS = {
  Low: { score: '0-25', color: 'emerald', description: 'Low immediate risk' },
  Medium: { score: '26-50', color: 'amber', description: 'Moderate risk, plan migration' },
  High: { score: '51-75', color: 'orange', description: 'High risk, urgent action needed' },
  Critical: { score: '76-100', color: 'red', description: 'Critical risk, immediate action required' },
};

export const RISK_SCORING_RULES = {
  industry: {
    healthcare: 20,
    finance: 25,
    government: 30,
    tech: 15,
    retail: 10,
    education: 10,
    other: 12,
  },
  dataType: {
    personal: 10,
    financial: 20,
    medical: 25,
    government: 30,
    intellectual: 15,
    communications: 12,
  },
  encryption: {
    'rsa-2048': 20,
    'rsa-4096': 15,
    'ecc-256': 18,
    'ecc-384': 12,
    unknown: 25,
  },
  dataLifetime: {
    5: 5,
    10: 10,
    25: 20,
    50: 30,
    100: 35,
  },
};
