import { api } from '../lib/api';
import {
  QDayProbability,
  QDayProgress,
  ExpertPrediction,
  QDayScenario,
} from '../types/qday.types';

/**
 * Get Q-Day probability score
 */
export async function getQDayProbability(): Promise<QDayProbability> {
  const response = await api.get('/qday/probability');
  return response.data.data;
}

/**
 * Get quantum computing milestones
 */
export async function getQuantumProgress(): Promise<QDayProgress> {
  const response = await api.get('/qday/progress');
  return response.data.data;
}

/**
 * Get expert predictions
 */
export async function getExpertPredictions(): Promise<ExpertPrediction[]> {
  const response = await api.get('/qday/experts');
  return response.data.data;
}

/**
 * Get Q-Day scenarios
 */
export async function getQDayScenarios(): Promise<QDayScenario[]> {
  const response = await api.get('/qday/scenarios');
  return response.data.data;
}

/**
 * Seed Q-Day data (development)
 */
export async function seedQDayData(): Promise<void> {
  await api.post('/qday/seed');
}
