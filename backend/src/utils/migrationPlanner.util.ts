export interface MigrationPhase {
  phase: number;
  title: string;
  duration: string;
  durationMonths: number;
  tasks: string[];
  estimatedCostMin: number;
  estimatedCostMax: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  algorithmsToAdopt: string[];
  successCriteria: string[];
}

export interface MigrationRoadmap {
  companyProfile: {
    size: string;
    industry: string;
    budget: string;
    complianceRequirements: string[];
  };
  riskSummary: {
    overall: 'critical' | 'high' | 'medium' | 'low';
    score: number; // 0-100
    quantumThreatLevel: string;
  };
  currentState: {
    algorithm: string;
    keySize: number;
    vulnerabilities: string[];
    estimatedBreakTime: string;
  };
  phases: MigrationPhase[];
  totalEstimatedCost: {
    min: number;
    max: number;
  };
  totalTimelineMonths: number;
  recommendations: string[];
  nextSteps: string[];
}

export interface CompanyInfo {
  size: 'startup' | 'sme' | 'enterprise';
  industry: string;
  budget: 'low' | 'medium' | 'high' | 'unlimited';
  complianceRequirements: string[];
}

export interface EncryptionStack {
  webApi: string;
  database: string;
  storage: string;
  communication: string;
  codeSigning: boolean;
}

export interface DataInventory {
  types: string[]; // PII, Financial, Medical, Classified, IP, Public
  retentionPeriod: string;
  volume: string;
  externalSharing: boolean;
}

export interface Priorities {
  criticalFirst: boolean;
  budgetConstraint: 'low' | 'medium' | 'high';
  teamExpertise: 'beginner' | 'intermediate' | 'expert';
  timeline: string; // ASAP, 1yr, 2yr, 3yr
}

/**
 * Assess current risk level
 */
export function assessCurrentRisk(stack: EncryptionStack): {
  overall: 'critical' | 'high' | 'medium' | 'low';
  score: number;
  summary: string;
} {
  let score = 0;
  let vulnerabilities = 0;

  // Assess web API
  if (stack.webApi === 'RSA-1024') {
    score += 25;
    vulnerabilities += 1;
  } else if (stack.webApi === 'RSA-2048') {
    score += 15;
    vulnerabilities += 1;
  } else if (stack.webApi.includes('Kyber') || stack.webApi === 'RSA-4096') {
    score -= 5;
  }

  // Assess database
  if (stack.database === 'DES' || stack.database === '3DES') {
    score += 20;
    vulnerabilities += 1;
  } else if (stack.database === 'AES-128') {
    score += 5;
  } else if (stack.database === 'AES-256') {
    score -= 5;
  }

  // Assess communication
  if (stack.communication === 'TLS 1.0' || stack.communication === 'TLS 1.1') {
    score += 15;
    vulnerabilities += 1;
  } else if (stack.communication === 'TLS 1.2') {
    score += 5;
  } else if (stack.communication === 'TLS 1.3') {
    score -= 5;
  }

  // Assess storage
  if (!stack.storage) {
    score += 10;
    vulnerabilities += 1;
  }

  score = Math.max(0, Math.min(100, score));

  let overall: 'critical' | 'high' | 'medium' | 'low' = 'low';
  if (score >= 60) overall = 'critical';
  else if (score >= 40) overall = 'high';
  else if (score >= 20) overall = 'medium';

  const summary =
    vulnerabilities > 0
      ? `Found ${vulnerabilities} critical cryptographic vulnerabilities`
      : 'No critical vulnerabilities detected';

  return { overall, score, summary };
}

/**
 * Generate migration phases
 */
export function generateMigrationPhases(
  company: CompanyInfo,
  stack: EncryptionStack,
  data: DataInventory,
  priorities: Priorities
): MigrationPhase[] {
  const phases: MigrationPhase[] = [];
  const isEnterprise = company.size === 'enterprise';
  const hasCriticalData = data.types.includes('Classified') || data.types.includes('Medical');
  const budgetFlexibility = company.budget === 'unlimited' || company.budget === 'high';

  // Phase 1: Inventory & Assessment
  phases.push({
    phase: 1,
    title: 'Inventory & Assessment',
    duration: '0-3 months',
    durationMonths: 3,
    tasks: [
      'Conduct comprehensive cryptographic asset audit',
      'Document all encryption algorithms in use',
      'Identify quantum-vulnerable systems',
      'Create dependency map',
      'Assess team skills and gaps',
      'Plan budget allocation',
    ],
    estimatedCostMin: isEnterprise ? 15000 : 5000,
    estimatedCostMax: isEnterprise ? 40000 : 15000,
    priority: 'critical',
    algorithmsToAdopt: [],
    successCriteria: [
      'Complete inventory of all cryptographic assets',
      'Risk assessment completed',
      'Migration roadmap finalized',
    ],
  });

  // Phase 2: Pilot Migration
  phases.push({
    phase: 2,
    title: 'Pilot Migration (Low-Risk Systems)',
    duration: '3-6 months',
    durationMonths: 3,
    tasks: [
      'Select pilot systems (non-critical)',
      'Set up test environment',
      'Implement CRYSTALS-Kyber pilot',
      'Run security testing',
      'Document lessons learned',
      'Train team on new algorithms',
    ],
    estimatedCostMin: isEnterprise ? 20000 : 8000,
    estimatedCostMax: isEnterprise ? 60000 : 25000,
    priority: 'high',
    algorithmsToAdopt: ['CRYSTALS-Kyber-768', 'CRYSTALS-Dilithium-3'],
    successCriteria: [
      'Pilot systems running post-quantum algorithms',
      'Security audit passed',
      'Performance benchmarks acceptable',
    ],
  });

  // Phase 3: Core Systems Migration
  phases.push({
    phase: 3,
    title: 'Core Systems Migration',
    duration: '6-12 months',
    durationMonths: 6,
    tasks: [
      'Migrate web APIs to post-quantum',
      'Update database encryption',
      'Implement hybrid cryptography',
      'Update TLS to 1.3',
      'Continuous security testing',
      'Performance optimization',
    ],
    estimatedCostMin: isEnterprise ? 40000 : 15000,
    estimatedCostMax: isEnterprise ? 120000 : 50000,
    priority: 'critical',
    algorithmsToAdopt: ['CRYSTALS-Kyber-768', 'CRYSTALS-Dilithium-3', 'AES-256'],
    successCriteria: [
      'All core systems migrated',
      'Zero quantum-vulnerable algorithms in production',
      'SLA compliance maintained',
    ],
  });

  // Phase 4: Legacy System Migration
  phases.push({
    phase: 4,
    title: 'Legacy System Migration',
    duration: '12-18 months',
    durationMonths: 6,
    tasks: [
      'Evaluate legacy system compatibility',
      'Plan phased retirement or upgrade',
      'Implement wrapper cryptography if needed',
      'Decommission vulnerable systems',
      'Update documentation',
    ],
    estimatedCostMin: isEnterprise ? 30000 : 10000,
    estimatedCostMax: isEnterprise ? 80000 : 30000,
    priority: 'medium',
    algorithmsToAdopt: ['Hybrid Cryptography', 'Quantum-Safe TLS'],
    successCriteria: [
      'All legacy systems updated or retired',
      'No unpatched quantum vulnerabilities',
    ],
  });

  // Phase 5: Full Validation & Compliance
  phases.push({
    phase: 5,
    title: 'Full Validation & Compliance',
    duration: '18-24 months',
    durationMonths: 6,
    tasks: [
      'Complete security audit',
      'Compliance verification (NIST, HIPAA, etc.)',
      'Penetration testing',
      'Documentation update',
      'Team training completion',
      'Maintenance plan establishment',
    ],
    estimatedCostMin: isEnterprise ? 20000 : 5000,
    estimatedCostMax: isEnterprise ? 50000 : 20000,
    priority: 'high',
    algorithmsToAdopt: [],
    successCriteria: [
      'All compliance requirements met',
      'Zero quantum vulnerabilities',
      'Maintenance procedures documented',
    ],
  });

  return phases;
}

/**
 * Calculate cost estimates based on company profile
 */
export function calculateCostEstimates(
  company: CompanyInfo,
  phases: MigrationPhase[]
): { min: number; max: number } {
  let totalMin = 0;
  let totalMax = 0;

  phases.forEach((phase) => {
    const costMultiplier =
      company.budget === 'low' ? 0.8 : company.budget === 'high' ? 1.2 : 1.0;
    totalMin += phase.estimatedCostMin * costMultiplier;
    totalMax += phase.estimatedCostMax * costMultiplier;
  });

  // Add contingency (10-15%)
  totalMin *= 1.1;
  totalMax *= 1.15;

  return { min: Math.round(totalMin), max: Math.round(totalMax) };
}

/**
 * Generate recommendations based on company profile
 */
export function generateRecommendations(
  company: CompanyInfo,
  stack: EncryptionStack,
  data: DataInventory,
  risk: ReturnType<typeof assessCurrentRisk>
): string[] {
  const recommendations: string[] = [];

  // Risk-based recommendations
  if (risk.score >= 60) {
    recommendations.push(
      'URGENT: Implement immediate security measures. Your current setup has critical vulnerabilities.'
    );
  }

  // Data-based recommendations
  if (data.types.includes('Classified') || data.types.includes('Medical')) {
    recommendations.push(
      'Start migration with classified/medical data. This is highest priority for quantum-safe protection.'
    );
  }

  // Timeline recommendations
  if (company.size === 'enterprise') {
    recommendations.push(
      'Enterprise-scale migration: Plan for 18-24 months. Start Phase 1 immediately.'
    );
  } else if (company.size === 'sme') {
    recommendations.push(
      'SME-scale migration: Plan for 12-18 months. Consider phased approach to manage costs.'
    );
  } else {
    recommendations.push(
      'Startup-scale: Implement post-quantum cryptography from the start. 6-9 month timeline.'
    );
  }

  // Compliance recommendations
  if (company.complianceRequirements.length > 0) {
    recommendations.push(
      `Compliance focus: Ensure all ${company.complianceRequirements.join(', ')} requirements are met during migration.`
    );
  }

  // Algorithm recommendations
  recommendations.push('Adopt CRYSTALS-Kyber-768 as primary post-quantum algorithm.');
  recommendations.push('Use hybrid cryptography during transition phase (classical + PQC).');
  recommendations.push('Enforce TLS 1.3 for all communications.');

  return recommendations;
}

/**
 * Generate complete migration roadmap
 */
export function generateMigrationRoadmap(
  company: CompanyInfo,
  stack: EncryptionStack,
  data: DataInventory,
  priorities: Priorities
): MigrationRoadmap {
  const risk = assessCurrentRisk(stack);
  const phases = generateMigrationPhases(company, stack, data, priorities);
  const costs = calculateCostEstimates(company, phases);
  const recommendations = generateRecommendations(company, stack, data, risk);

  const totalMonths = phases.reduce((sum, p) => sum + p.durationMonths, 0);

  return {
    companyProfile: {
      size: company.size,
      industry: company.industry,
      budget: company.budget,
      complianceRequirements: company.complianceRequirements,
    },
    riskSummary: {
      overall: risk.overall,
      score: risk.score,
      quantumThreatLevel:
        risk.score >= 60
          ? 'CRITICAL - Implement immediately'
          : risk.score >= 40
            ? 'HIGH - Start planning within 6 months'
            : risk.score >= 20
              ? 'MEDIUM - Plan for next 12-18 months'
              : 'LOW - Begin planning, not urgent',
    },
    currentState: {
      algorithm: stack.webApi,
      keySize: stack.webApi.includes('1024')
        ? 1024
        : stack.webApi.includes('2048')
          ? 2048
          : stack.webApi.includes('4096')
            ? 4096
            : 0,
      vulnerabilities: risk.overall !== 'low' ? ['RSA vulnerable to quantum attacks'] : [],
      estimatedBreakTime:
        stack.webApi === 'RSA-1024'
          ? 'Minutes to hours'
          : stack.webApi === 'RSA-2048'
            ? '5-10 years'
            : 'Not vulnerable',
    },
    phases,
    totalEstimatedCost: costs,
    totalTimelineMonths: totalMonths,
    recommendations,
    nextSteps: [
      'Schedule kick-off meeting with stakeholders',
      'Assign migration project manager',
      'Allocate budget for Phase 1',
      'Begin Phase 1 activities within 2 weeks',
      'Set up governance framework for migration',
    ],
  };
}
