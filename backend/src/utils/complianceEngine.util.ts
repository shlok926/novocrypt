export interface ComplianceRequirement {
  id: string;
  description: string;
  category: string;
  mandatory: boolean;
}

export interface ComplianceResult {
  standard: string;
  status: 'pass' | 'fail' | 'warning' | 'na';
  score: number; // 0-100
  requirements: {
    id: string;
    description: string;
    status: 'pass' | 'fail' | 'warning';
    evidence?: string;
  }[];
  gaps: string[];
  recommendations: string[];
}

export interface EncryptionProfile {
  webApiAlgorithm: string; // RSA-1024, RSA-2048, RSA-4096, ECC-256, ECC-384, Kyber
  webApiKeySize?: number;
  databaseAlgorithm: string; // AES-128, AES-256, DES, 3DES, None
  databaseKeySize?: number;
  storageEncryption: boolean;
  tlsVersion: string; // TLS 1.0, 1.1, 1.2, 1.3
  keyRotationPolicy: boolean;
  codeSigningUsed: boolean;
}

/**
 * Check NIST SP 800-208 (Quantum-Safe Cryptography Guidelines)
 */
export function checkNIST800208(profile: EncryptionProfile): ComplianceResult {
  const requirements: ComplianceResult['requirements'] = [];
  const gaps: string[] = [];
  const recommendations: string[] = [];

  // Check for post-quantum awareness
  const hasPostQuantumPlans =
    profile.webApiAlgorithm.includes('Kyber') ||
    profile.webApiAlgorithm === 'RSA-4096' ||
    profile.webApiAlgorithm === 'ECC-384';

  if (!hasPostQuantumPlans) {
    requirements.push({
      id: 'nist800208-pqc',
      description: 'Organization has post-quantum cryptography migration plans',
      status: 'fail',
    });
    gaps.push('No post-quantum migration strategy identified');
    recommendations.push(
      'Develop a quantum-safe migration roadmap starting with CRYSTALS-Kyber'
    );
  } else {
    requirements.push({
      id: 'nist800208-pqc',
      description: 'Organization has post-quantum cryptography migration plans',
      status: 'pass',
    });
  }

  // Check RSA key size
  if (profile.webApiAlgorithm === 'RSA-1024') {
    requirements.push({
      id: 'nist800208-rsa-key-size',
      description: 'RSA keys are 2048 bits or larger',
      status: 'fail',
    });
    gaps.push('RSA-1024 is too weak and vulnerable to quantum attacks');
    recommendations.push('Upgrade to RSA-4096 minimum or use CRYSTALS-Kyber');
  } else if (profile.webApiAlgorithm === 'RSA-2048') {
    requirements.push({
      id: 'nist800208-rsa-key-size',
      description: 'RSA keys are 2048 bits or larger',
      status: 'warning',
    });
    gaps.push('RSA-2048 has moderate quantum risk');
    recommendations.push('Plan upgrade to post-quantum algorithms');
  } else if (profile.webApiAlgorithm.includes('RSA-4096') || profile.webApiAlgorithm.includes('Kyber')) {
    requirements.push({
      id: 'nist800208-rsa-key-size',
      description: 'RSA keys are 2048 bits or larger',
      status: 'pass',
    });
  }

  // Check crypto agility
  requirements.push({
    id: 'nist800208-crypto-agility',
    description: 'System has crypto agility to support algorithm changes',
    status: 'warning',
    evidence: 'Manual verification required',
  });
  recommendations.push(
    'Implement flexible cryptography framework to support algorithm transitions'
  );

  const score = calculateScore(requirements);
  const status = deriveStatus(requirements);

  return {
    standard: 'NIST SP 800-208',
    status,
    score,
    requirements,
    gaps,
    recommendations,
  };
}

/**
 * Check NIST FIPS 203 (CRYSTALS-Kyber Standard)
 */
export function checkNISTFIPS203(profile: EncryptionProfile): ComplianceResult {
  const requirements: ComplianceResult['requirements'] = [];
  const gaps: string[] = [];
  const recommendations: string[] = [];

  if (profile.webApiAlgorithm.includes('Kyber')) {
    requirements.push({
      id: 'fips203-kyber-adoption',
      description: 'CRYSTALS-Kyber algorithm is adopted for key encapsulation',
      status: 'pass',
    });
  } else {
    requirements.push({
      id: 'fips203-kyber-adoption',
      description: 'CRYSTALS-Kyber algorithm is adopted for key encapsulation',
      status: 'fail',
    });
    gaps.push('CRYSTALS-Kyber not currently implemented');
    recommendations.push(
      'Adopt CRYSTALS-Kyber-768 for production key encapsulation mechanism'
    );
  }

  const score = calculateScore(requirements);
  const status = deriveStatus(requirements);

  return {
    standard: 'NIST FIPS 203',
    status,
    score,
    requirements,
    gaps,
    recommendations,
  };
}

/**
 * Check HIPAA (Healthcare Data Protection)
 */
export function checkHIPAA(profile: EncryptionProfile): ComplianceResult {
  const requirements: ComplianceResult['requirements'] = [];
  const gaps: string[] = [];
  const recommendations: string[] = [];

  // Check encryption at rest
  if (profile.databaseAlgorithm === 'AES-256') {
    requirements.push({
      id: 'hipaa-encryption-rest',
      description: 'Encryption at rest using approved algorithms (AES-256)',
      status: 'pass',
    });
  } else {
    requirements.push({
      id: 'hipaa-encryption-rest',
      description: 'Encryption at rest using approved algorithms (AES-256)',
      status: 'fail',
    });
    gaps.push('Database encryption not using AES-256');
    recommendations.push('Implement AES-256 for all PHI at rest');
  }

  // Check encryption in transit
  if (profile.tlsVersion === 'TLS 1.2' || profile.tlsVersion === 'TLS 1.3') {
    requirements.push({
      id: 'hipaa-encryption-transit',
      description: 'Encryption in transit using TLS 1.2+',
      status: 'pass',
    });
  } else {
    requirements.push({
      id: 'hipaa-encryption-transit',
      description: 'Encryption in transit using TLS 1.2+',
      status: 'fail',
    });
    gaps.push(`TLS version ${profile.tlsVersion} is below minimum requirement`);
    recommendations.push('Enforce TLS 1.2 or higher for all communications');
  }

  // Check key management
  if (profile.keyRotationPolicy) {
    requirements.push({
      id: 'hipaa-key-rotation',
      description: 'Encryption key rotation policy is implemented',
      status: 'pass',
    });
  } else {
    requirements.push({
      id: 'hipaa-key-rotation',
      description: 'Encryption key rotation policy is implemented',
      status: 'fail',
    });
    gaps.push('No key rotation policy in place');
    recommendations.push('Implement automatic key rotation (min. annual)');
  }

  const score = calculateScore(requirements);
  const status = deriveStatus(requirements);

  return {
    standard: 'HIPAA',
    status,
    score,
    requirements,
    gaps,
    recommendations,
  };
}

/**
 * Check PCI-DSS v4.0 (Payment Card Industry)
 */
export function checkPCIDSS(profile: EncryptionProfile): ComplianceResult {
  const requirements: ComplianceResult['requirements'] = [];
  const gaps: string[] = [];
  const recommendations: string[] = [];

  // Check strong cryptography
  const strongCryptoUsed =
    profile.webApiAlgorithm === 'RSA-4096' ||
    profile.webApiAlgorithm.includes('Kyber') ||
    profile.webApiAlgorithm === 'ECC-384';

  if (strongCryptoUsed && profile.databaseAlgorithm === 'AES-256') {
    requirements.push({
      id: 'pci-strong-crypto',
      description: 'Strong cryptography is used (RSA-4096 or post-quantum)',
      status: 'pass',
    });
  } else {
    requirements.push({
      id: 'pci-strong-crypto',
      description: 'Strong cryptography is used (RSA-4096 or post-quantum)',
      status: 'fail',
    });
    gaps.push('Cryptography strength is below PCI-DSS requirements');
    recommendations.push('Upgrade to RSA-4096 or CRYSTALS-Kyber');
  }

  // Check TLS version
  if (profile.tlsVersion === 'TLS 1.2' || profile.tlsVersion === 'TLS 1.3') {
    requirements.push({
      id: 'pci-tls-version',
      description: 'TLS 1.2 or higher is enforced',
      status: 'pass',
    });
  } else {
    requirements.push({
      id: 'pci-tls-version',
      description: 'TLS 1.2 or higher is enforced',
      status: 'fail',
    });
    gaps.push(`${profile.tlsVersion} is deprecated for PCI-DSS`);
    recommendations.push('Enforce TLS 1.2 minimum, migrate to TLS 1.3');
  }

  const score = calculateScore(requirements);
  const status = deriveStatus(requirements);

  return {
    standard: 'PCI-DSS v4.0',
    status,
    score,
    requirements,
    gaps,
    recommendations,
  };
}

/**
 * Check GDPR (EU Data Protection)
 */
export function checkGDPR(profile: EncryptionProfile): ComplianceResult {
  const requirements: ComplianceResult['requirements'] = [];
  const gaps: string[] = [];
  const recommendations: string[] = [];

  // Check encryption and pseudonymization
  const hasEncryption =
    profile.databaseAlgorithm === 'AES-256' && profile.storageEncryption;

  if (hasEncryption) {
    requirements.push({
      id: 'gdpr-encryption',
      description: 'Personal data is encrypted and pseudonymized',
      status: 'pass',
    });
  } else {
    requirements.push({
      id: 'gdpr-encryption',
      description: 'Personal data is encrypted and pseudonymized',
      status: 'fail',
    });
    gaps.push('Insufficient encryption of personal data');
    recommendations.push('Implement end-to-end encryption with AES-256 + pseudonymization');
  }

  const score = calculateScore(requirements);
  const status = deriveStatus(requirements);

  return {
    standard: 'GDPR',
    status,
    score,
    requirements,
    gaps,
    recommendations,
  };
}

/**
 * Calculate compliance score from requirements
 */
function calculateScore(requirements: ComplianceResult['requirements']): number {
  if (requirements.length === 0) return 0;

  const passCount = requirements.filter((r) => r.status === 'pass').length;
  const warningCount = requirements.filter((r) => r.status === 'warning').length;
  const failCount = requirements.filter((r) => r.status === 'fail').length;

  const score = (passCount * 100 + warningCount * 50) / requirements.length;
  return Math.round(score);
}

/**
 * Derive overall status from requirements
 */
function deriveStatus(
  requirements: ComplianceResult['requirements']
): 'pass' | 'fail' | 'warning' | 'na' {
  const failCount = requirements.filter((r) => r.status === 'fail').length;
  const warningCount = requirements.filter((r) => r.status === 'warning').length;

  if (failCount > 0) return 'fail';
  if (warningCount > 0) return 'warning';
  return 'pass';
}

/**
 * Run all compliance checks
 */
export function runAllComplianceChecks(profile: EncryptionProfile): ComplianceResult[] {
  return [
    checkNIST800208(profile),
    checkNISTFIPS203(profile),
    checkHIPAA(profile),
    checkPCIDSS(profile),
    checkGDPR(profile),
  ];
}

/**
 * Calculate overall compliance score
 */
export function calculateOverallComplianceScore(results: ComplianceResult[]): number {
  if (results.length === 0) return 0;
  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  return Math.round(totalScore / results.length);
}
