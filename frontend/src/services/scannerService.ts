import { api } from '@/lib/api';
import {
  ScanResult,
  ScannerRecommendations,
  BatchScanRequest,
  BatchScanResult,
} from '@/types/scanner.types';

const API_BASE = '/scanner';

export const scannerService = {
  /**
   * Scan SSL certificate for a domain
   */
  async scanSSLCertificate(domain: string): Promise<ScanResult> {
    const response = await api.post(`${API_BASE}/ssl`, { domain });
    return response.data;
  },

  /**
   * Scan code snippet for cryptographic vulnerabilities
   */
  async scanCodeSnippet(
    code: string,
    language: string = 'javascript'
  ): Promise<ScanResult> {
    const response = await api.post(`${API_BASE}/code`, { code, language });
    return response.data;
  },

  /**
   * Batch scan multiple domains for SSL vulnerabilities
   */
  async batchScanSSL(domains: string[]): Promise<BatchScanResult> {
    const response = await api.post(`${API_BASE}/batch`, { domains });
    return response.data;
  },

  /**
   * Get quantum-safe algorithm recommendations
   */
  async getRecommendations(): Promise<ScannerRecommendations> {
    const response = await api.get(`${API_BASE}/recommendations`);
    return response.data;
  },
};

export default scannerService;
