import { api } from '../lib/api';
import {
  ThreatItem,
  ThreatFeed,
  ThreatLevel,
  ThreatStats,
  ThreatSubscription,
} from '../types/threat.types';

/**
 * Get paginated threat feed
 */
export async function getThreatFeed(
  page: number = 1,
  limit: number = 20,
  category?: string,
  severity?: string
): Promise<ThreatFeed> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (category) params.append('category', category);
  if (severity) params.append('severity', severity);

  const response = await api.get(`/threats/feed?${params}`);
  return response.data.data;
}

/**
 * Get live threat feed (RSS combined)
 */
export async function getLiveThreats(): Promise<ThreatItem[]> {
  const response = await api.get('/threats/live');
  return response.data.data;
}

/**
 * Get global threat level
 */
export async function getThreatLevel(): Promise<ThreatLevel> {
  const response = await api.get('/threats/level');
  return response.data.data;
}

/**
 * Get government advisories
 */
export async function getAdvisories(): Promise<ThreatItem[]> {
  const response = await api.get('/threats/advisories');
  return response.data.data;
}

/**
 * Get vendor vulnerability alerts
 */
export async function getVendorAlerts(): Promise<ThreatItem[]> {
  const response = await api.get('/threats/vendors');
  return response.data.data;
}

/**
 * Get threat statistics
 */
export async function getThreatStats(): Promise<ThreatStats> {
  const response = await api.get('/threats/stats');
  return response.data.data;
}

/**
 * Subscribe to threat alerts
 */
export async function subscribeToAlerts(
  email: string,
  severityThreshold: string
): Promise<ThreatSubscription> {
  const response = await api.post('/threats/subscribe', {
    email,
    severityThreshold,
  });
  return response.data.data;
}

/**
 * Seed sample threats (development only)
 */
export async function seedThreats(): Promise<void> {
  await api.post('/threats/seed');
}
