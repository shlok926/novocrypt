import { MigrationPlan, MigrationStep } from '../types/api.types';

interface MigrationInput {
  organizationSize: 'small' | 'medium' | 'large' | 'enterprise';
  industry: 'finance' | 'healthcare' | 'government' | 'retail' | 'technology' | 'other';
  currentCrypto: string[];
  budget: 'low' | 'medium' | 'high';
  timeline: 'urgent' | 'standard' | 'flexible';
}

export async function generateMigrationPlan(input: MigrationInput): Promise<MigrationPlan> {
  const steps = generateMigrationSteps(input);
  const timeline = calculateTimeline(input);
  const estimatedCost = estimateCost(input);
  const risks = identifyRisks(input);

  return {
    id: `plan-${Date.now()}`,
    organizationSize: input.organizationSize,
    industry: input.industry,
    currentAlgorithms: input.currentCrypto,
    recommendedAlgorithms: getRecommendedAlgorithms(input.industry),
    steps,
    timeline,
    estimatedCost,
    risks,
    successCriteria: getSuccessCriteria(input),
    createdAt: new Date().toISOString(),
    completionDate: calculateCompletionDate(timeline)
  };
}

function generateMigrationSteps(input: MigrationInput): MigrationStep[] {
  const baseSteps = [
    {
      number: 1,
      title: 'Cryptographic Inventory & Assessment',
      description: 'Audit all systems to identify where cryptographic algorithms are used',
      duration: input.organizationSize === 'enterprise' ? '8-12 weeks' : '4-6 weeks',
      tasks: [
        'Map all cryptographic implementations across infrastructure',
        'Identify RSA, ECDSA, SHA-1 usage',
        'Document certificate inventory and expiration dates',
        'Assess dependencies and third-party crypto usage',
        'Create comprehensive crypto registry'
      ],
      resources: input.organizationSize === 'enterprise' ? ['Security Team', 'Infrastructure Team', 'External Auditor'] : ['Security Team', 'Infrastructure Team'],
      deliverables: ['Crypto Inventory Report', 'Risk Assessment Matrix', 'Dependency Map'],
      estimatedCost: input.organizationSize === 'enterprise' ? 50000 : 15000,
      status: 'not-started' as const
    },
    {
      number: 2,
      title: 'PQC Algorithm Selection & Testing',
      description: 'Evaluate and select NIST-approved PQC algorithms (ML-KEM, ML-DSA, SLH-DSA)',
      duration: input.organizationSize === 'enterprise' ? '6-10 weeks' : '3-5 weeks',
      tasks: [
        'Evaluate ML-KEM (Kyber) for key establishment',
        'Evaluate ML-DSA (Dilithium) for digital signatures',
        'Test performance impact on systems',
        'Create hybrid encryption strategy (classical + PQC)',
        'Develop crypto migration decision matrix'
      ],
      resources: ['Cryptography Experts', 'Development Team', 'QA Team'],
      deliverables: ['Algorithm Selection Report', 'Performance Test Results', 'Hybrid Strategy Document'],
      estimatedCost: input.organizationSize === 'enterprise' ? 80000 : 25000,
      status: 'not-started' as const
    },
    {
      number: 3,
      title: 'Hybrid Cryptography Implementation',
      description: 'Implement hybrid classical-quantum-safe encryption in critical systems',
      duration: input.organizationSize === 'enterprise' ? '12-16 weeks' : '6-10 weeks',
      tasks: [
        'Implement hybrid TLS with PQC support',
        'Update key generation and storage',
        'Deploy PQC in PKI/certificate infrastructure',
        'Implement hybrid signatures (ECDSA + ML-DSA)',
        'Create rollback procedures'
      ],
      resources: ['Development Team', 'DevOps Team', 'Security Team', 'Database Team'],
      deliverables: ['Hybrid Implementation', 'Updated PKI', 'Testing Report', 'Operational Guide'],
      estimatedCost: input.organizationSize === 'enterprise' ? 150000 : 50000,
      status: 'not-started' as const
    },
    {
      number: 4,
      title: 'Legacy System Migration',
      description: 'Migrate remaining RSA/ECDSA systems to post-quantum alternatives',
      duration: input.organizationSize === 'enterprise' ? '16-24 weeks' : '8-14 weeks',
      tasks: [
        'Migrate legacy systems to PQC (prioritize critical systems)',
        'Update all digital certificates',
        'Re-encrypt sensitive historical data',
        'Update cryptographic libraries and dependencies',
        'Decommission deprecated crypto algorithms'
      ],
      resources: ['Development Team', 'DevOps Team', 'Data Engineering', 'Compliance Team'],
      deliverables: ['Migration Completion Report', 'Crypto Library Updates', 'Certificate Inventory'],
      estimatedCost: input.organizationSize === 'enterprise' ? 200000 : 60000,
      status: 'not-started' as const
    },
    {
      number: 5,
      title: 'Validation, Compliance & Ongoing Monitoring',
      description: 'Verify migration success and establish continuous cryptographic monitoring',
      duration: input.organizationSize === 'enterprise' ? '6-12 weeks' : '4-8 weeks',
      tasks: [
        'Security audit and penetration testing',
        'Verify all systems using approved PQC algorithms',
        'Compliance validation (NIST, FIPS, industry standards)',
        'Establish crypto monitoring and alerting',
        'Create incident response procedures for new threats'
      ],
      resources: ['Security Team', 'QA Team', 'Compliance Officer', 'External Auditor'],
      deliverables: ['Audit Report', 'Compliance Certificate', 'Monitoring Setup', 'Incident Response Plan'],
      estimatedCost: input.organizationSize === 'enterprise' ? 100000 : 35000,
      status: 'not-started' as const
    }
  ];

  return baseSteps;
}

function calculateTimeline(input: MigrationInput): string {
  const baseWeeks = {
    small: 26,
    medium: 40,
    large: 60,
    enterprise: 80
  };

  const weeks = baseWeeks[input.organizationSize];
  const months = Math.ceil(weeks / 4);

  if (input.timeline === 'urgent') {
    return `${Math.ceil(months * 0.7)} months (accelerated)`;
  } else if (input.timeline === 'flexible') {
    return `${Math.ceil(months * 1.5)} months (relaxed)`;
  }
  return `${months} months`;
}

function calculateCompletionDate(timeline: string): string {
  const months = parseInt(timeline.match(/\d+/)?.[0] || '12');
  const completionDate = new Date();
  completionDate.setMonth(completionDate.getMonth() + months);
  return completionDate.toISOString().split('T')[0];
}

function estimateCost(input: MigrationInput): { total: number; perStep: Record<number, number> } {
  const baseCosts = {
    small: 150000,
    medium: 400000,
    large: 900000,
    enterprise: 600000
  };

  const baseCost = baseCosts[input.organizationSize];

  let multiplier = 1;
  if (input.budget === 'low') multiplier = 0.7;
  if (input.budget === 'high') multiplier = 1.4;

  const total = Math.round(baseCost * multiplier);

  const perStep: Record<number, number> = {
    1: Math.round(total * 0.15),
    2: Math.round(total * 0.2),
    3: Math.round(total * 0.35),
    4: Math.round(total * 0.2),
    5: Math.round(total * 0.1)
  };

  return { total, perStep };
}

function identifyRisks(input: MigrationInput) {
  const risks: string[] = [];

  if (input.organizationSize === 'enterprise') {
    risks.push('Complex legacy system compatibility issues');
    risks.push('Dependency management across departments');
  }

  if (input.industry === 'finance' || input.industry === 'government') {
    risks.push('Regulatory compliance complexity');
    risks.push('Business continuity during migration');
  }

  if (input.currentCrypto.includes('RSA-2048')) {
    risks.push('Long migration timeline for RSA systems');
  }

  if (input.timeline === 'urgent') {
    risks.push('Inadequate testing time');
    risks.push('Resource constraints');
  }

  return risks;
}

function getRecommendedAlgorithms(industry: string): string[] {
  const recommendations: Record<string, string[]> = {
    finance: ['ML-KEM (Kyber)', 'ML-DSA (Dilithium)', 'AES-256', 'SHA-256'],
    healthcare: ['ML-KEM (Kyber)', 'ML-DSA (Dilithium)', 'AES-256', 'HMAC-SHA-256'],
    government: ['ML-KEM', 'ML-DSA', 'SLH-DSA', 'AES-256', 'SHA-3'],
    retail: ['ML-KEM (Kyber)', 'AES-256', 'SHA-256'],
    technology: ['ML-KEM (Kyber)', 'ML-DSA (Dilithium)', 'AES-256', 'SHA-3'],
    other: ['ML-KEM (Kyber)', 'ML-DSA (Dilithium)', 'AES-256']
  };

  return recommendations[industry] || recommendations.other;
}

function getSuccessCriteria(input: MigrationInput) {
  return [
    '100% of RSA/ECDSA systems migrated to PQC alternatives',
    'Zero instances of deprecated SHA-1 hashing',
    'All certificates using post-quantum compatible algorithms',
    'Hybrid cryptography implemented in all critical systems',
    'Compliance certification obtained (NIST/FIPS)',
    'No performance degradation > 5% after migration',
    'Incident response procedures tested and validated'
  ];
}
