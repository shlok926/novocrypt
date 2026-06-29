export type RiskInput = {
  industry: string;
  dataType: string;
  encryption: string;
  dataLifetime: number;
};

const industryWeight: Record<string, number> = {
  healthcare: 30,
  finance: 28,
  government: 35,
  technology: 24,
  education: 18,
  personal: 12,
};

const dataWeight: Record<string, number> = {
  pii: 20,
  financial: 24,
  medical: 25,
  intellectual_property: 22,
  communications: 18,
};

const encryptionWeight: Record<string, number> = {
  rsa_1024: 32,
  rsa_2048: 25,
  rsa_4096: 18,
  ecc: 16,
  kyber: 4,
  dilithium: 5,
};

export const calculateRisk = (input: RiskInput) => {
  const i = industryWeight[input.industry] ?? 15;
  const d = dataWeight[input.dataType] ?? 15;
  const e = encryptionWeight[input.encryption] ?? 20;
  const lifetime = Math.min(25, Math.round(input.dataLifetime * 0.8));

  const riskScore = Math.max(0, Math.min(100, i + d + e + lifetime));
  const riskLevel =
    riskScore >= 80 ? 'Critical' : riskScore >= 60 ? 'High' : riskScore >= 35 ? 'Medium' : 'Low';

  const yearsUntilRisk = Math.max(1, 2035 - new Date().getFullYear());
  const recommendations = [
    'Inventory all cryptographic assets used in your systems.',
    'Prioritize migration from RSA to NIST-approved post-quantum standards.',
    'Implement crypto-agility to support algorithm transitions quickly.',
    'Review long-lived data retention and apply stronger protections.',
  ];

  return { riskScore, riskLevel, yearsUntilRisk, recommendations };
};
