import { useState } from 'react';
import { generateRSAKeyPair, classicalFactorization } from '../utils/rsa';
import { shorsAlgorithm } from '../utils/shors';

export const useRSA = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateKeys = (p: number, q: number, e: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const keyPair = generateRSAKeyPair(p, q, e);
      setIsLoading(false);
      return keyPair;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to generate keys';
      setError(errorMsg);
      setIsLoading(false);
      return null;
    }
  };

  const runClassicalAttack = (n: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = classicalFactorization(n);
      setIsLoading(false);
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Classical attack failed';
      setError(errorMsg);
      setIsLoading(false);
      return null;
    }
  };

  const runQuantumAttack = (n: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = shorsAlgorithm(n);
      setIsLoading(false);
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Quantum attack failed';
      setError(errorMsg);
      setIsLoading(false);
      return null;
    }
  };

  return {
    isLoading,
    error,
    generateKeys,
    runClassicalAttack,
    runQuantumAttack,
  };
};
