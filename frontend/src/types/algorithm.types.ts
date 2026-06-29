export interface Algorithm {
  id: string;
  name: string;
  category: 'classical' | 'quantum-safe';
  keySize: number;
  securityLevel: number;
  postQuantumSafe: boolean;
  description: string;
}

export interface AlgorithmComparison {
  algorithm: string;
  timeComplexity: string;
  spaceComplexity: string;
  keySize: number;
  securityLevel: number;
}
