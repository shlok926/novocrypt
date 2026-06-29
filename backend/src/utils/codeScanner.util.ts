export interface CodeVulnerability {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  lineNumber?: number;
  lineContent?: string;
  recommendation: string;
  quantumBreakable: boolean;
  estimatedBreakTime?: string;
}

/**
 * Detect programming language from code snippet
 */
export function detectLanguage(code: string): string {
  if (code.includes('import React') || code.includes('from "react"')) return 'javascript';
  if (code.includes('import') && code.includes('from')) return 'python';
  if (code.includes('import java')) return 'java';
  if (code.includes('using System')) return 'csharp';
  if (code.includes('package main') || code.includes('func main()')) return 'go';

  // Detect by file extension patterns in comments
  if (code.includes('.py') || code.includes('def ') || code.includes('python')) return 'python';
  if (code.includes('.js') || code.includes('function ') || code.includes('const ')) return 'javascript';

  return 'unknown';
}

/**
 * Scan code for cryptographic vulnerabilities
 */
export function scanCodeForVulnerabilities(code: string): CodeVulnerability[] {
  const vulnerabilities: CodeVulnerability[] = [];
  const lines = code.split('\n');

  // Critical vulnerability patterns
  const criticalPatterns = [
    {
      regex: /crypto\.createCipher\s*\(/gi,
      type: 'DES_CIPHER',
      description: 'Deprecated crypto.createCipher() found. DES is cryptographically broken.',
      recommendation: 'Replace with crypto.createCipheriv() using AES-256',
      quantumBreakable: true,
    },
    {
      regex: /Math\.random\s*\(\s*\)\s*[*]/gi,
      type: 'INSECURE_RANDOM',
      description: 'Math.random() used for cryptographic operations. Not cryptographically secure.',
      recommendation: 'Use crypto.getRandomBytes() or similar secure RNG',
      quantumBreakable: true,
    },
    {
      regex: /(password|secret|key|api_key)\s*=\s*['"]/gi,
      type: 'HARDCODED_CREDENTIALS',
      description: 'Hardcoded credentials/secrets detected in code',
      recommendation: 'Use environment variables or secrets management system',
      quantumBreakable: false,
    },
    {
      regex: /RSA\s*[-]?\s*512/gi,
      type: 'RSA_512',
      description: 'RSA-512 detected. Easily breakable even classically.',
      recommendation: 'Use RSA-4096 minimum, or better: CRYSTALS-Kyber',
      quantumBreakable: true,
      estimatedBreakTime: 'Minutes',
    },
    {
      regex: /RSA\s*[-]?\s*1024/gi,
      type: 'RSA_1024',
      description: 'RSA-1024 detected. Vulnerable to quantum attacks.',
      recommendation: 'Upgrade to RSA-4096 or migrate to post-quantum algorithms',
      quantumBreakable: true,
      estimatedBreakTime: '1-5 years',
    },
  ];

  // High severity patterns
  const highPatterns = [
    {
      regex: /MD5|md5|MD-5/gi,
      type: 'MD5_HASH',
      description: 'MD5 hashing algorithm used. Cryptographically broken.',
      recommendation: 'Use SHA-256 or SHA-3 instead',
      quantumBreakable: true,
    },
    {
      regex: /SHA\s*1|SHA1|sha1/gi,
      type: 'SHA1_HASH',
      description: 'SHA-1 hashing algorithm used. Weak against collisions.',
      recommendation: 'Use SHA-256 or SHA-3 instead',
      quantumBreakable: true,
    },
    {
      regex: /RSA\s*[-]?\s*2048/gi,
      type: 'RSA_2048',
      description: 'RSA-2048 detected. Moderate quantum risk.',
      recommendation: 'Plan migration to post-quantum cryptography',
      quantumBreakable: true,
      estimatedBreakTime: '5-10 years',
    },
    {
      regex: /DES|3DES|TripleDES/gi,
      type: 'DES_ALGORITHM',
      description: 'DES or 3DES detected. Weak encryption algorithm.',
      recommendation: 'Use AES-256 instead',
      quantumBreakable: true,
    },
    {
      regex: /ECC\s*[-]?\s*(256|P[-]?256)/gi,
      type: 'ECC_256',
      description: 'ECC-256 (P-256) detected. May be vulnerable to quantum attacks.',
      recommendation: 'Consider ECC-384 or post-quantum alternatives like CRYSTALS-Kyber',
      quantumBreakable: true,
      estimatedBreakTime: '10-20 years',
    },
  ];

  // Medium severity patterns
  const mediumPatterns = [
    {
      regex: /eval\s*\(/gi,
      type: 'EVAL_USAGE',
      description: 'eval() function used. Major security risk.',
      recommendation: 'Avoid eval(). Use safer alternatives.',
      quantumBreakable: false,
    },
    {
      regex: /null|undefined/gi,
      type: 'NULL_POINTER',
      description: 'Potential null/undefined references.',
      recommendation: 'Add proper null checking',
      quantumBreakable: false,
    },
  ];

  // Scan for critical vulnerabilities
  criticalPatterns.forEach((pattern) => {
    lines.forEach((line, index) => {
      if (pattern.regex.test(line)) {
        vulnerabilities.push({
          id: `vuln_${vulnerabilities.length}`,
          type: pattern.type,
          severity: 'critical',
          description: pattern.description,
          lineNumber: index + 1,
          lineContent: line.trim(),
          recommendation: pattern.recommendation,
          quantumBreakable: pattern.quantumBreakable,
          estimatedBreakTime: pattern.estimatedBreakTime,
        });
      }
    });
  });

  // Scan for high severity vulnerabilities (if no critical found)
  if (vulnerabilities.length === 0) {
    highPatterns.forEach((pattern) => {
      lines.forEach((line, index) => {
        if (pattern.regex.test(line)) {
          vulnerabilities.push({
            id: `vuln_${vulnerabilities.length}`,
            type: pattern.type,
            severity: 'high',
            description: pattern.description,
            lineNumber: index + 1,
            lineContent: line.trim(),
            recommendation: pattern.recommendation,
            quantumBreakable: pattern.quantumBreakable,
            estimatedBreakTime: pattern.estimatedBreakTime,
          });
        }
      });
    });
  }

  // Scan for medium severity
  if (vulnerabilities.length === 0) {
    mediumPatterns.forEach((pattern) => {
      lines.forEach((line, index) => {
        if (pattern.regex.test(line)) {
          vulnerabilities.push({
            id: `vuln_${vulnerabilities.length}`,
            type: pattern.type,
            severity: 'medium',
            description: pattern.description,
            lineNumber: index + 1,
            lineContent: line.trim(),
            recommendation: pattern.recommendation,
            quantumBreakable: pattern.quantumBreakable,
          });
        }
      });
    });
  }

  return vulnerabilities;
}

/**
 * Calculate overall code security score (0-100)
 */
export function calculateCodeSecurityScore(vulnerabilities: CodeVulnerability[]): number {
  if (vulnerabilities.length === 0) return 100;

  const criticalCount = vulnerabilities.filter((v) => v.severity === 'critical').length;
  const highCount = vulnerabilities.filter((v) => v.severity === 'high').length;
  const mediumCount = vulnerabilities.filter((v) => v.severity === 'medium').length;
  const lowCount = vulnerabilities.filter((v) => v.severity === 'low').length;

  const score = 100 - criticalCount * 20 - highCount * 10 - mediumCount * 5 - lowCount * 1;
  return Math.max(0, score);
}

/**
 * Determine risk level based on vulnerabilities
 */
export function determineRiskLevel(vulnerabilities: CodeVulnerability[]): string {
  const criticalCount = vulnerabilities.filter((v) => v.severity === 'critical').length;
  const highCount = vulnerabilities.filter((v) => v.severity === 'high').length;

  if (criticalCount > 0) return 'critical';
  if (highCount >= 2) return 'high';
  if (highCount === 1) return 'medium';
  if (vulnerabilities.length > 0) return 'low';

  return 'none';
}

/**
 * Get remediation summary
 */
export function getRemediationSummary(vulnerabilities: CodeVulnerability[]): {
  criticalActions: string[];
  recommendedActions: string[];
  postQuantumMigration: string[];
} {
  const criticalActions: string[] = [];
  const recommendedActions: string[] = [];
  const postQuantumMigration: string[] = [];

  vulnerabilities.forEach((vuln) => {
    if (vuln.severity === 'critical') {
      criticalActions.push(`[Line ${vuln.lineNumber}] ${vuln.recommendation}`);
    } else {
      recommendedActions.push(`[Line ${vuln.lineNumber}] ${vuln.recommendation}`);
    }

    if (vuln.quantumBreakable) {
      postQuantumMigration.push(vuln.recommendation);
    }
  });

  return {
    criticalActions,
    recommendedActions,
    postQuantumMigration,
  };
}
