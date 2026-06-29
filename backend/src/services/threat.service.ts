import { ThreatIntelligence, Severity } from '../types/api.types';

// Mock threat intelligence data
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

export async function getThreatIntelligence(
  filters?: {
    severity?: Severity;
    category?: string;
    limit?: number;
  }
): Promise<ThreatIntelligence[]> {
  let threats = [...mockThreats];

  if (filters?.severity) {
    threats = threats.filter(t => t.severity === filters.severity);
  }

  if (filters?.category) {
    threats = threats.filter(t => t.category === filters.category);
  }

  const limit = filters?.limit || 20;
  return threats.slice(0, limit);
}

export async function getThreatById(id: string): Promise<ThreatIntelligence | null> {
  return mockThreats.find(t => t.id === id) || null;
}

export async function getThreatStatistics() {
  const totalThreats = mockThreats.length;
  const criticalCount = mockThreats.filter(t => t.severity === 'critical').length;
  const highCount = mockThreats.filter(t => t.severity === 'high').length;
  const mediumCount = mockThreats.filter(t => t.severity === 'medium').length;
  const lowCount = mockThreats.filter(t => t.severity === 'low').length;

  const categories: Record<string, number> = {};
  mockThreats.forEach(t => {
    categories[t.category] = (categories[t.category] || 0) + 1;
  });

  const affectedAlgorithms: Record<string, number> = {};
  mockThreats.forEach(t => {
    t.affectedAlgorithms.forEach(algo => {
      affectedAlgorithms[algo] = (affectedAlgorithms[algo] || 0) + 1;
    });
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
    affectedAlgorithms,
    lastUpdated: new Date().toISOString()
  };
}

export async function searchThreats(query: string): Promise<ThreatIntelligence[]> {
  const lowerQuery = query.toLowerCase();
  return mockThreats.filter(
    t =>
      t.title.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.affectedAlgorithms.some(algo => algo.toLowerCase().includes(lowerQuery))
  );
}
