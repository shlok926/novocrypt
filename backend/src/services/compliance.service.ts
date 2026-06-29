// Compliance Checker Service - Validates cryptographic implementations against standards

export interface ComplianceStandard {
  id: string;
  name: string;
  description: string;
  requirements: string[];
  year: number;
  applicableIndustries: string[];
}

export interface ComplianceCheck {
  id: string;
  organizationName: string;
  currentAlgorithms: string[];
  targetStandards: string[];
  timestamp: string;
  results: ComplianceResult[];
  overallCompliance: number;
}

export interface ComplianceResult {
  standardId: string;
  standardName: string;
  compliant: boolean;
  score: number;
  gaps: ComplianceGap[];
  recommendations: string[];
}

export interface ComplianceGap {
  requirement: string;
  currentState: string;
  requiredState: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  remediationSteps: string[];
}

const COMPLIANCE_STANDARDS: ComplianceStandard[] = [
  {
    id: 'nist-800-175b',
    name: 'NIST SP 800-175B',
    description: 'Guidelines for Using Cryptographic Standards in the Federal Government - Cryptographic Mechanisms',
    requirements: [
      'Use approved encryption algorithms',
      'Implement key management procedures',
      'Minimum key lengths specified',
      'Regular algorithm review and updates'
    ],
    year: 2019,
    applicableIndustries: ['government', 'finance', 'healthcare']
  },
  {
    id: 'fips-203',
    name: 'FIPS 203 (ML-KEM)',
    description: 'Post-Quantum Cryptography: Module-Lattice-Based Key Encapsulation Mechanism',
    requirements: [
      'ML-KEM for key establishment',
      'Proper parameter selection',
      'Secure random number generation',
      'Side-channel resistance'
    ],
    year: 2024,
    applicableIndustries: ['all']
  },
  {
    id: 'fips-204',
    name: 'FIPS 204 (ML-DSA)',
    description: 'Post-Quantum Cryptography: Module-Lattice-Based Digital Signature Algorithm',
    requirements: [
      'ML-DSA for digital signatures',
      'Proper key generation',
      'Signature verification',
      'Certificate binding'
    ],
    year: 2024,
    applicableIndustries: ['all']
  },
  {
    id: 'fips-205',
    name: 'FIPS 205 (SLH-DSA)',
    description: 'Post-Quantum Cryptography: Stateless Hash-Based Digital Signature Algorithm',
    requirements: [
      'SLH-DSA for stateless signatures',
      'Long-term key protection',
      'Signature uniqueness',
      'Memory-efficient implementation'
    ],
    year: 2024,
    applicableIndustries: ['all']
  },
  {
    id: 'iso-20022',
    name: 'ISO/IEC 20022-2',
    description: 'Financial Industry Message Authentication - Approved algorithms',
    requirements: [
      'Approved cryptographic algorithms',
      'Key agreement protocols',
      'Message authentication codes',
      'Secure key distribution'
    ],
    year: 2021,
    applicableIndustries: ['finance']
  },
  {
    id: 'hipaa-security',
    name: 'HIPAA Security Rule',
    description: 'Healthcare data protection requirements',
    requirements: [
      'Encryption of PHI data',
      'Access control mechanisms',
      'Audit logging',
      'Integrity verification'
    ],
    year: 2013,
    applicableIndustries: ['healthcare']
  }
];

const ALGORITHM_COMPLIANCE: Record<string, string[]> = {
  'RSA-2048': ['nist-800-175b'],
  'RSA-4096': ['nist-800-175b', 'iso-20022'],
  'ECDSA': ['nist-800-175b'],
  'SHA-256': ['nist-800-175b', 'fips-203', 'fips-204', 'iso-20022'],
  'SHA-1': [], // Deprecated
  'AES-256': ['nist-800-175b', 'hipaa-security'],
  'AES-128': ['nist-800-175b'],
  'DES': [], // Deprecated
  'MD5': [], // Deprecated
  'ML-KEM': ['fips-203'],
  'ML-DSA': ['fips-204'],
  'SLH-DSA': ['fips-205']
};

export const complianceService = {
  async getComplianceStandards(): Promise<ComplianceStandard[]> {
    return COMPLIANCE_STANDARDS;
  },

  async getStandardById(standardId: string): Promise<ComplianceStandard | null> {
    return COMPLIANCE_STANDARDS.find(s => s.id === standardId) || null;
  },

  async checkCompliance(input: {
    organizationName: string;
    currentAlgorithms: string[];
    targetStandards: string[];
    industry?: string;
  }): Promise<ComplianceCheck> {
    const standards = COMPLIANCE_STANDARDS.filter(s => input.targetStandards.includes(s.id));
    
    const results: ComplianceResult[] = standards.map(standard => {
      const compliantAlgos = input.currentAlgorithms.filter(algo =>
        ALGORITHM_COMPLIANCE[algo]?.includes(standard.id)
      );
      
      const nonCompliantAlgos = input.currentAlgorithms.filter(algo =>
        !ALGORITHM_COMPLIANCE[algo]?.includes(standard.id)
      );
      
      const gaps: ComplianceGap[] = [];
      
      // Check for deprecated algorithms
      if (input.currentAlgorithms.includes('SHA-1') || input.currentAlgorithms.includes('MD5')) {
        gaps.push({
          requirement: 'Use only approved cryptographic algorithms',
          currentState: `Using deprecated: ${['SHA-1', 'MD5'].filter(a => input.currentAlgorithms.includes(a)).join(', ')}`,
          requiredState: 'Use NIST-approved algorithms (SHA-256 or quantum-safe alternatives)',
          severity: 'critical',
          remediationSteps: [
            'Audit all code using SHA-1 or MD5',
            'Replace with SHA-256 for current migration',
            'Plan migration to quantum-safe alternatives (SHA3, ML-DSA)',
            'Update dependencies and libraries'
          ]
        });
      }
      
      // Check key lengths
      if (input.currentAlgorithms.includes('RSA-2048')) {
        gaps.push({
          requirement: 'Use sufficient key lengths',
          currentState: 'RSA-2048 (2048-bit keys)',
          requiredState: 'RSA-4096 or ML-KEM recommended',
          severity: 'high',
          remediationSteps: [
            'Evaluate performance impact of larger keys',
            'Implement RSA-4096 for new certificates',
            'Schedule migration of existing keys',
            'Test compatibility with dependent systems'
          ]
        });
      }
      
      // Check for post-quantum readiness
      const pqcAlgos = input.currentAlgorithms.filter(a => ['ML-KEM', 'ML-DSA', 'SLH-DSA'].includes(a));
      if (pqcAlgos.length === 0 && ['fips-203', 'fips-204', 'fips-205'].some(s => input.targetStandards.includes(s))) {
        gaps.push({
          requirement: 'Implement post-quantum cryptography',
          currentState: 'No post-quantum algorithms detected',
          requiredState: 'Implement ML-KEM, ML-DSA, and/or SLH-DSA',
          severity: 'high',
          remediationSteps: [
            'Procure and test post-quantum libraries',
            'Develop migration roadmap',
            'Implement hybrid approaches (classical + PQC)',
            'Gradual rollout and testing'
          ]
        });
      }
      
      const isCompliant = gaps.length === 0;
      const score = Math.max(0, 100 - (gaps.reduce((acc, g) => {
        const severityWeight = { critical: 30, high: 20, medium: 10, low: 5 };
        return acc + severityWeight[g.severity];
      }, 0)));
      
      return {
        standardId: standard.id,
        standardName: standard.name,
        compliant: isCompliant,
        score,
        gaps,
        recommendations: [
          ...nonCompliantAlgos.length > 0 ? [`Replace non-compliant algorithms: ${nonCompliantAlgos.join(', ')}`] : [],
          `Focus on achieving 100% compliance with ${standard.name}`,
          'Implement regular compliance audits quarterly',
          'Train team on compliance requirements'
        ]
      };
    });
    
    const overallCompliance = results.reduce((acc, r) => acc + r.score, 0) / Math.max(1, results.length);
    
    return {
      id: `compliance-${Date.now()}`,
      organizationName: input.organizationName,
      currentAlgorithms: input.currentAlgorithms,
      targetStandards: input.targetStandards,
      timestamp: new Date().toISOString(),
      results,
      overallCompliance: Math.round(overallCompliance)
    };
  }
};
