export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: {
    message: string;
    details?: unknown;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// Threat Intelligence Types
export type Severity = 'critical' | 'high' | 'medium' | 'low';

export interface ThreatIntelligence {
  id: string;
  title: string;
  description: string;
  source: string;
  severity: Severity;
  category: 'quantum-progress' | 'standards' | 'attack' | 'vulnerability' | 'regulation' | 'trend' | 'positive-news';
  date: string;
  affectedAlgorithms: string[];
  recommendation: string;
  impact: string;
  source_url: string;
}

// Migration Planner Types
export interface MigrationStep {
  number: number;
  title: string;
  description: string;
  duration: string;
  tasks: string[];
  resources: string[];
  deliverables: string[];
  estimatedCost: number;
  status: 'not-started' | 'in-progress' | 'completed';
}

export interface MigrationPlan {
  id: string;
  organizationSize: 'small' | 'medium' | 'large' | 'enterprise';
  industry: 'finance' | 'healthcare' | 'government' | 'retail' | 'technology' | 'other';
  currentAlgorithms: string[];
  recommendedAlgorithms: string[];
  steps: MigrationStep[];
  timeline: string;
  estimatedCost: {
    total: number;
    perStep: Record<number, number>;
  };
  risks: string[];
  successCriteria: string[];
  createdAt: string;
  completionDate: string;
}
