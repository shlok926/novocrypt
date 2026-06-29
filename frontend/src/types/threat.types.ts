export interface ThreatItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  category: 'advisory' | 'research' | 'breach' | 'vendor';
  severity: 'low' | 'medium' | 'high' | 'critical';
  url: string;
  publishedAt: string;
  createdAt: string;
}

export interface ThreatFeed {
  items: ThreatItem[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ThreatLevel {
  level: 'low' | 'medium' | 'high' | 'critical';
  score: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  summary: string;
}

export interface ThreatStats {
  totalThreats: number;
  bySeverity: Array<{ severity: string; _count: number }>;
  byCategory: Array<{ category: string; _count: number }>;
  lastUpdated: string;
}

export interface ThreatSubscription {
  id: string;
  email: string;
  severityThreshold: string;
  createdAt: string;
}
