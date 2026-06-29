import { useEffect } from 'react';
import { useThreatStore } from '../store/threatStore';

/**
 * Custom hook for threat data with auto-fetch
 */
export function useThreatFeed() {
  const { feed, threatLevel, advisories, vendorAlerts, stats, loading, error, fetchAll } =
    useThreatStore();

  useEffect(() => {
    fetchAll();

    // Refresh every 5 minutes
    const interval = setInterval(fetchAll, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  return {
    feed,
    threatLevel,
    advisories,
    vendorAlerts,
    stats,
    loading,
    error,
    refresh: fetchAll,
  };
}

/**
 * Get threat level color based on severity
 */
export function getThreatLevelColor(level: string): string {
  switch (level) {
    case 'critical':
      return 'text-red-600 bg-red-50';
    case 'high':
      return 'text-orange-600 bg-orange-50';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50';
    case 'low':
      return 'text-green-600 bg-green-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

/**
 * Get severity badge color
 */
export function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-800';
    case 'high':
      return 'bg-orange-100 text-orange-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

/**
 * Get category icon
 */
export function getCategoryIcon(category: string): string {
  switch (category) {
    case 'advisory':
      return '⚠️';
    case 'research':
      return '📚';
    case 'breach':
      return '🚨';
    case 'vendor':
      return '🏢';
    default:
      return '📰';
  }
}

/**
 * Format date to relative time
 */
export function formatRelativeTime(date: string): string {
  const now = new Date();
  const published = new Date(date);
  const seconds = Math.floor((now.getTime() - published.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return published.toLocaleDateString();
}
