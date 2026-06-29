import { api } from '@/lib/api';
import {
  ThreatIntelligence,
  MigrationPlan,
  MigrationTemplates,
  ValidationResult
} from '@/types/threat-migration.types';

const THREAT_API_BASE = '/threats';
const MIGRATION_API_BASE = '/migration';

// Mock threat data for when API is unavailable
const mockThreats: ThreatIntelligence[] = [
  {
    id: '1',
    title: 'New Quantum Computing Milestone: 1000+ Qubit System Achieved',
    description: 'Researchers announce breakthrough in quantum computing with 1000+ stable qubits. Experts warn this accelerates Q-Day timeline estimates.',
    source: 'Quantum Computing Journal',
    severity: 'critical',
    category: 'quantum-progress',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    affectedAlgorithms: ['RSA', 'ECDSA', 'Diffie-Hellman'],
    recommendation: 'Accelerate migration to PQC algorithms. Begin post-quantum cryptography adoption immediately.',
    impact: 'High - RSA/ECDSA vulnerable to quantum attacks',
    source_url: 'https://example.com/quantum-1000-qubits'
  },
  {
    id: '2',
    title: 'NIST Post-Quantum Cryptography Standards Finalized',
    description: 'NIST announces final PQC standards: ML-KEM (Kyber), ML-DSA (Dilithium), SLH-DSA (SPHINCS+). All organizations should adopt these standards.',
    source: 'NIST',
    severity: 'high',
    category: 'standards',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    affectedAlgorithms: ['RSA', 'ECDSA', 'HMAC'],
    recommendation: 'Adopt NIST-approved PQC standards. Begin testing ML-KEM and ML-DSA in your infrastructure.',
    impact: 'Medium - Requires algorithm migration but standards are now stable',
    source_url: 'https://example.com/nist-pqc-standards'
  },
  {
    id: '3',
    title: 'Harvest Now, Decrypt Later Attack Detected',
    description: 'Sophisticated attackers identified collecting and storing encrypted data for future decryption with quantum computers.',
    source: 'Cybersecurity Alliance',
    severity: 'critical',
    category: 'attack',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    affectedAlgorithms: ['RSA-2048', 'ECDSA'],
    recommendation: 'Immediately encrypt all sensitive data with hybrid classical-quantum algorithms.',
    impact: 'Critical - Sensitive historical data at risk',
    source_url: 'https://example.com/harvest-now-decrypt-later'
  },
  {
    id: '4',
    title: 'SHA-1 Collision Exploits in the Wild',
    description: 'New SHA-1 collision attack variants detected in real-world exploits. Migrate to SHA-256/SHA-3 immediately.',
    source: 'Security Research Lab',
    severity: 'high',
    category: 'vulnerability',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    affectedAlgorithms: ['SHA-1'],
    recommendation: 'Migrate all SHA-1 hashing to SHA-256 or SHA-3. Update digital signatures.',
    impact: 'High - Digital signatures can be forged',
    source_url: 'https://example.com/sha1-collision-exploits'
  },
  {
    id: '5',
    title: 'AES-256 Remains Secure Against Quantum Attacks',
    description: 'Cryptographic research confirms AES-256 requires 2^128 quantum operations, maintaining security even in quantum era.',
    source: 'Cryptography Research Institute',
    severity: 'low',
    category: 'positive-news',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    affectedAlgorithms: [],
    recommendation: 'Good news: AES-256 can be retained. Focus migration efforts on asymmetric algorithms.',
    impact: 'Positive - Symmetric encryption remains secure',
    source_url: 'https://example.com/aes256-quantum-safe'
  },
  {
    id: '6',
    title: 'IBM Quantum Network Expansion to 100+ Qubit Systems',
    description: 'IBM announces expanded quantum computing access through cloud platform. Organizations should assess quantum computing risks.',
    source: 'IBM Research',
    severity: 'medium',
    category: 'quantum-progress',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    affectedAlgorithms: ['RSA', 'ECC'],
    recommendation: 'Review your cryptographic inventory. Identify all RSA/ECC usage and create migration timeline.',
    impact: 'Medium - Quantum capabilities expanding',
    source_url: 'https://example.com/ibm-quantum-expansion'
  },
  {
    id: '7',
    title: 'Government Mandates PQC Migration by 2030',
    description: 'Multiple governments announce mandatory post-quantum cryptography migration deadline for 2030.',
    source: 'Government Cybersecurity Agency',
    severity: 'high',
    category: 'regulation',
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    affectedAlgorithms: ['RSA', 'ECDSA', 'DSA'],
    recommendation: 'Plan for compliance: audit current crypto, create migration roadmap, implement PQC by 2030.',
    impact: 'High - Regulatory requirement',
    source_url: 'https://example.com/gov-pqc-mandate'
  },
  {
    id: '8',
    title: 'Hybrid Cryptography Adoption Increases',
    description: 'Industry trend: 65% of enterprises now using hybrid classical+quantum-safe encryption.',
    source: 'Enterprise Security Survey',
    severity: 'low',
    category: 'trend',
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    affectedAlgorithms: [],
    recommendation: 'Consider hybrid approach: maintain AES-256 + add Kyber for key exchange.',
    impact: 'Positive - Industry best practice',
    source_url: 'https://example.com/hybrid-crypto-trend'
  }
];

// Threat Intelligence Service
export const threatService = {
  async getAllThreats(filters?: {
    severity?: string;
    category?: string;
    limit?: number;
  }): Promise<ThreatIntelligence[]> {
    try {
      // Try the existing threat feed endpoint first
      const response = await api.get(`${THREAT_API_BASE}/feed?page=1&limit=${filters?.limit || 50}`);
      
      // Transform backend response to frontend format
      if (response.data.data && Array.isArray(response.data.data.items)) {
        let threats = response.data.data.items.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.summary || item.description || 'No description available',
          source: item.source,
          severity: item.severity,
          category: item.category,
          date: item.publishedAt || item.date,
          affectedAlgorithms: item.affectedAlgorithms || ['RSA', 'ECDSA'],
          recommendation: item.recommendation || 'Monitor for updates',
          impact: item.impact || 'Unknown impact',
          source_url: item.url || item.source_url || '#'
        }));

        // Apply filters
        if (filters?.severity) {
          threats = threats.filter((t: ThreatIntelligence) => t.severity === filters.severity);
        }
        if (filters?.category) {
          threats = threats.filter((t: ThreatIntelligence) => t.category === filters.category);
        }

        return threats;
      }
    } catch (error) {
      console.warn('Existing threat API unavailable, using mock data');
    }

    // Fall back to mock data
    let threats = [...mockThreats];

    if (filters?.severity) {
      threats = threats.filter(t => t.severity === filters.severity);
    }

    if (filters?.category) {
      threats = threats.filter(t => t.category === filters.category);
    }

    const limit = filters?.limit || 20;
    return threats.slice(0, limit);
  },

  async getThreatById(id: string): Promise<ThreatIntelligence | null> {
    try {
      const response = await api.get(`${THREAT_API_BASE}/${id}`);
      return response.data.data || null;
    } catch (error) {
      // Fall back to mock data
      return mockThreats.find(t => t.id === id) || null;
    }
  },

  async getThreatStatistics(): Promise<any> {
    try {
      const response = await api.get(`${THREAT_API_BASE}/stats`);
      const data = response.data.data || response.data;
      
      return {
        totalThreats: data.totalThreats || 0,
        bySeverity: data.bySeverity || { critical: 0, high: 0, medium: 0, low: 0 },
        byCategory: data.byCategory || {},
        lastUpdated: data.lastUpdated || new Date().toISOString()
      };
    } catch (error) {
      console.warn('Threat stats API unavailable, generating from mock data');
      
      // Generate stats from mock data
      const totalThreats = mockThreats.length;
      const criticalCount = mockThreats.filter(t => t.severity === 'critical').length;
      const highCount = mockThreats.filter(t => t.severity === 'high').length;
      const mediumCount = mockThreats.filter(t => t.severity === 'medium').length;
      const lowCount = mockThreats.filter(t => t.severity === 'low').length;

      const categories: Record<string, number> = {};
      mockThreats.forEach(t => {
        categories[t.category] = (categories[t.category] || 0) + 1;
      });

      return {
        totalThreats,
        bySeverity: {
          critical: criticalCount,
          high: highCount,
          medium: mediumCount,
          low: lowCount
        },
        byCategory: categories,
        lastUpdated: new Date().toISOString()
      };
    }
  },

  async searchThreats(query: string): Promise<ThreatIntelligence[]> {
    try {
      const response = await api.get(`${THREAT_API_BASE}/search?q=${encodeURIComponent(query)}`);
      return response.data.data || [];
    } catch (error) {
      console.warn('Threat search API unavailable, using mock data');
      
      // Fall back to mock search
      const lowerQuery = query.toLowerCase();
      return mockThreats.filter(
        t =>
          t.title.toLowerCase().includes(lowerQuery) ||
          t.description.toLowerCase().includes(lowerQuery) ||
          t.affectedAlgorithms.some(algo => algo.toLowerCase().includes(lowerQuery))
      );
    }
  }
};

// Migration Planner Service
export const migrationService = {
  async generateMigrationPlan(input: {
    organizationSize: string;
    industry: string;
    currentCrypto: string[];
    budget?: string;
    timeline?: string;
  }): Promise<MigrationPlan | null> {
    try {
      const response = await api.post(`${MIGRATION_API_BASE}/plan`, {
        organizationSize: input.organizationSize,
        industry: input.industry,
        currentCrypto: input.currentCrypto,
        budget: input.budget || 'medium',
        timeline: input.timeline || 'standard'
      });
      return response.data.data || null;
    } catch (error) {
      console.warn('Migration plan API unavailable, generating mock migration plan');
      
      // Determine recommended algorithms based on industry
      let recommendedAlgos: string[] = [];
      if (['finance', 'healthcare', 'government'].includes(input.industry)) {
        recommendedAlgos = ['ML-KEM', 'ML-DSA', 'SLH-DSA'];
      } else {
        recommendedAlgos = ['ML-KEM', 'ML-DSA'];
      }
      
      // Generate realistic migration plan based on organization size and budget
      const timelineMultiplier = input.timeline === 'urgent' ? 0.7 : input.timeline === 'flexible' ? 1.5 : 1;
      const budgetMultiplier = input.budget === 'low' ? 0.6 : input.budget === 'high' ? 2 : 1;
      
      const baseCost = input.organizationSize === 'small' ? 50000 : 
                       input.organizationSize === 'medium' ? 200000 : 
                       input.organizationSize === 'large' ? 800000 : 2000000;
      
      const step1Cost = Math.round(baseCost * 0.1 * budgetMultiplier);
      const step2Cost = Math.round(baseCost * 0.2 * budgetMultiplier);
      const step3Cost = Math.round(baseCost * 0.5 * budgetMultiplier);
      const step4Cost = Math.round(baseCost * 0.15 * budgetMultiplier);
      const step5Cost = Math.round(baseCost * 0.05 * budgetMultiplier);
      const totalCost = step1Cost + step2Cost + step3Cost + step4Cost + step5Cost;
      
      const startDate = new Date();
      const monthsToAdd = Math.round(16 * timelineMultiplier);
      const completionDate = new Date(startDate);
      completionDate.setMonth(completionDate.getMonth() + monthsToAdd);
      
      return {
        id: `plan-${Date.now()}`,
        organizationSize: input.organizationSize as 'small' | 'medium' | 'large' | 'enterprise',
        industry: input.industry as 'finance' | 'healthcare' | 'government' | 'retail' | 'technology' | 'other',
        recommendedAlgorithms: recommendedAlgos,
        currentAlgorithms: input.currentCrypto,
        timeline: `${Math.round(12 * timelineMultiplier)}-${Math.round(18 * timelineMultiplier)} months`,
        estimatedCost: {
          total: totalCost,
          perStep: {
            1: step1Cost,
            2: step2Cost,
            3: step3Cost,
            4: step4Cost,
            5: step5Cost
          }
        },
        risks: [
          'Compatibility issues with legacy systems',
          'Vendor dependency on quantum-safe library updates',
          'Performance overhead from larger key sizes',
          'Training and skills gaps in quantum cryptography',
          'Regulatory compliance during transition'
        ],
        successCriteria: [
          'All cryptographic keys migrated to quantum-safe algorithms',
          'Legacy systems updated or decommissioned',
          'Zero reported cryptographic vulnerabilities',
          'Team certified in quantum-safe cryptography',
          'Audit validation of migration completion'
        ],
        steps: [
          {
            number: 1,
            title: 'Cryptographic Inventory & Assessment',
            description: 'Conduct comprehensive audit of all cryptographic implementations and identify quantum-vulnerable algorithms',
            duration: `${Math.round(1 * timelineMultiplier)} months`,
            tasks: [
              'Scan all systems for current cryptographic usage',
              'Document encryption algorithms and key sizes',
              'Identify legacy systems and dependencies',
              'Evaluate replacement options'
            ],
            resources: ['Security audit team', 'Cryptography experts', 'Scanning tools'],
            deliverables: ['Cryptographic inventory report', 'Risk assessment', 'Gap analysis'],
            estimatedCost: step1Cost,
            status: 'not-started'
          },
          {
            number: 2,
            title: 'Quantum-Safe Library & Tool Implementation',
            description: 'Procure and test quantum-safe cryptographic libraries and development tools',
            duration: `${Math.round(2 * timelineMultiplier)} months`,
            tasks: [
              'Evaluate quantum-safe library options',
              'Set up development environment',
              'Create code migration templates',
              'Conduct proof-of-concept testing'
            ],
            resources: ['Development team', 'Security consultants', 'Test infrastructure'],
            deliverables: ['Selected libraries', 'Integration guide', 'POC results'],
            estimatedCost: step2Cost,
            status: 'not-started'
          },
          {
            number: 3,
            title: 'Code Migration & Refactoring',
            description: 'Systematically migrate all code to use quantum-safe cryptographic algorithms',
            duration: `${Math.round(6 * timelineMultiplier)} months`,
            tasks: [
              'Migrate authentication systems',
              'Update encryption implementations',
              'Refactor key management',
              'Update certificate handling'
            ],
            resources: ['Development team (expanded)', 'Code review board', 'Automation tools'],
            deliverables: ['Migrated codebase', 'Updated documentation', 'Code reviews completed'],
            estimatedCost: step3Cost,
            status: 'not-started'
          },
          {
            number: 4,
            title: 'Testing, Validation & Compliance',
            description: 'Comprehensive testing to ensure functionality, performance, and regulatory compliance',
            duration: `${Math.round(4 * timelineMultiplier)} months`,
            tasks: [
              'Functional testing with quantum-safe algorithms',
              'Performance benchmarking',
              'Security penetration testing',
              'Compliance validation (NIST, FIPS 203-205)'
            ],
            resources: ['QA team', 'Security testers', 'Compliance officers'],
            deliverables: ['Test reports', 'Performance analysis', 'Compliance certification'],
            estimatedCost: step4Cost,
            status: 'not-started'
          },
          {
            number: 5,
            title: 'Deployment, Training & Operations',
            description: 'Roll out quantum-safe systems to production and train teams for ongoing operations',
            duration: `${Math.round(3 * timelineMultiplier)} months`,
            tasks: [
              'Phased production deployment',
              'Staff training programs',
              'Incident response procedures',
              'Post-deployment monitoring'
            ],
            resources: ['DevOps team', 'Training team', 'Operations staff'],
            deliverables: ['Deployed systems', 'Training materials', 'Operations guide'],
            estimatedCost: step5Cost,
            status: 'not-started'
          }
        ],
        createdAt: new Date().toISOString(),
        completionDate: completionDate.toISOString().split('T')[0]
      };
    }
  },

  async getMigrationTemplates(): Promise<MigrationTemplates | null> {
    try {
      const response = await api.get(`${MIGRATION_API_BASE}/templates`);
      return response.data.data || null;
    } catch (error) {
      console.warn('Migration templates API unavailable, using default templates');
      
      // Return default templates
      return {
        organizationSizes: ['small', 'medium', 'large', 'enterprise'],
        industries: ['finance', 'healthcare', 'government', 'retail', 'technology', 'other'],
        budgetLevels: ['low', 'medium', 'high'],
        timelines: ['urgent', 'standard', 'flexible'],
        commonCryptoAlgorithms: [
          'RSA-2048',
          'RSA-4096',
          'ECDSA',
          'SHA-1',
          'SHA-256',
          'AES-128',
          'AES-256',
          'DES',
          'MD5'
        ]
      };
    }
  },

  async validateCryptoSetup(algorithms: string[]): Promise<ValidationResult | null> {
    try {
      const response = await api.post(`${MIGRATION_API_BASE}/validate`, {
        algorithms
      });
      return response.data.data || null;
    } catch (error) {
      console.error('Error validating crypto setup:', error);
      return null;
    }
  }
};
