export interface SSLCertificateInfo {
  domain: string;
  issuer: string;
  subject: string;
  validFrom: string;
  validTo: string;
  keySize: number;
  algorithm: string;
  signatureAlgorithm: string;
}

export interface SSLVulnerability {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendation: string;
  quantumRisk: boolean;
}

export interface CodeVulnerability {
  line: number;
  pattern: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  fix: string;
}

export interface ScanResult {
  id?: string;
  type: 'ssl' | 'code' | 'batch';
  target: string; // domain or code snippet
  vulnerabilities: SSLVulnerability[] | CodeVulnerability[];
  riskScore: number;
  timestamp?: string;
  recommendations: string[];
  remediationSteps?: string[];
  securityScore?: number;
}

export interface ScannerRecommendations {
  vulnerable: {
    algorithm: string;
    reason: string;
    severity: string;
  }[];
  safe: {
    algorithm: string;
    description: string;
    migrationSteps: string[];
  }[];
  timeline: string;
}

export interface BatchScanRequest {
  domains: string[];
}

export interface BatchScanResult {
  results: Array<{
    domain: string;
    vulnerabilities: SSLVulnerability[];
    riskScore: number;
  }>;
  summary: {
    totalScanned: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}
