import { api } from '../lib/api';
import {
  EncryptionResult,
  DecryptionResult,
  QuantumAttackSimulation,
  AlgorithmRecommendations,
  AlgorithmSpeed,
} from '../types/qday.types';

/**
 * Encrypt message
 */
export async function encryptMessage(
  message: string,
  algorithm: string,
  keySize: number
): Promise<EncryptionResult> {
  const response = await api.post('/playground/encrypt', {
    message,
    algorithm,
    keySize,
  });
  return response.data.data;
}

/**
 * Decrypt ciphertext
 */
export async function decryptMessage(
  ciphertext: string,
  algorithm: string,
  keySize: number
): Promise<DecryptionResult> {
  const response = await api.post('/playground/decrypt', {
    ciphertext,
    algorithm,
    keySize,
  });
  return response.data.data;
}

/**
 * Simulate Shor's algorithm quantum attack
 */
export async function simulateQuantumAttack(
  keySize: number
): Promise<QuantumAttackSimulation> {
  const response = await api.post('/playground/quantum-attack', {
    keySize,
  });
  return response.data.data;
}

/**
 * Get algorithm recommendations and speeds
 */
export async function getAlgorithmData(): Promise<{
  recommendations: AlgorithmRecommendations;
  speeds: AlgorithmSpeed[];
}> {
  const response = await api.get('/playground/algorithms');
  return response.data.data;
}

/**
 * Get encryption speed comparisons
 */
export async function getEncryptionSpeeds(): Promise<AlgorithmSpeed[]> {
  const response = await api.get('/playground/speeds');
  return response.data.data;
}
