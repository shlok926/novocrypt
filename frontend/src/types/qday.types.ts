export interface QuantumMilestone {
  company: string;
  year: number;
  qubitCount: number;
  milestone: string;
}

export interface ExpertPrediction {
  name: string;
  organization: string;
  prediction: string;
  timeline: string;
  confidence: number;
}

export interface QDayScenario {
  name: string;
  year: number;
  description: string;
  probability: number;
  impactLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface QDayProbability {
  probability: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  factors: Record<string, number>;
  lastUpdated: string;
}

export interface QDayProgress {
  milestones: QuantumMilestone[];
  companies: string[];
}

// Playground Types
export interface EncryptionResult {
  algorithm: string;
  keySize: number;
  plaintext: string;
  ciphertext: string;
  key: {
    publicKey: string;
    privateKey?: string;
  };
  encryptionTimeMs: number;
}

export interface DecryptionResult {
  algorithm: string;
  keySize: number;
  ciphertext: string;
  plaintext: string;
  decryptionTimeMs: number;
  method: 'classical' | 'quantum';
}

export interface QuantumAttackStep {
  step: number;
  description: string;
}

export interface QuantumAttackSimulation {
  algorithm: string;
  keySize: number;
  steps: string[];
  estimatedTimeClassical: string;
  estimatedTimeQuantum: string;
  factors: {
    p: number;
    q: number;
    n: number;
    phi: number;
  };
}

export interface AlgorithmSpeed {
  algorithm: string;
  keySize: number;
  estimatedTimeMs: number;
  quantumVulnerable: boolean;
}

export interface AlgorithmRecommendations {
  vulnerable: Array<{
    algorithm: string;
    reason: string;
    replacement: string;
  }>;
  safe: Array<{
    algorithm: string;
    reason: string;
  }>;
}
