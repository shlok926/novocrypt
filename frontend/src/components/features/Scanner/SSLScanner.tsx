import React, { useState } from 'react';
import { Loader2, AlertCircle, CheckCircle2, Shield } from 'lucide-react';
import scannerService from '@/services/scannerService';
import { ScanResult, SSLVulnerability } from '@/types/scanner.types';

export const SSLScanner: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim()) {
      setError('Please enter a domain');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const scanResult = await scannerService.scanSSLCertificate(domain);
      setResult(scanResult);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to scan SSL certificate'
      );
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertCircle className="w-4 h-4" />;
      case 'medium':
        return <Shield className="w-4 h-4" />;
      default:
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          🔐 SSL/TLS Certificate Scanner
        </h3>

        <form onSubmit={handleScan} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Domain Name
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="e.g., google.com, example.org"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2 transition"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  'Scan'
                )}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {result && (
        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">Scan Results</h4>
                <p className="text-sm text-gray-600">{domain}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {result.riskScore}%
                </div>
                <p className="text-xs text-gray-600">Risk Score</p>
              </div>
            </div>
          </div>

          {result.vulnerabilities && result.vulnerabilities.length > 0 ? (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">
                Vulnerabilities Found: {result.vulnerabilities.length}
              </h4>
              {(result.vulnerabilities as SSLVulnerability[]).map(
                (vuln, idx) => (
                  <div
                    key={idx}
                    className={`p-4 border rounded-lg ${getSeverityColor(
                      vuln.severity
                    )}`}
                  >
                    <div className="flex items-start gap-3">
                      {getSeverityIcon(vuln.severity)}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h5 className="font-semibold">{vuln.type}</h5>
                          <span className="text-xs px-2 py-1 bg-white bg-opacity-50 rounded font-medium">
                            {vuln.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{vuln.description}</p>
                        <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                          <p className="text-sm font-medium">
                            💡 Recommendation:
                          </p>
                          <p className="text-sm mt-1">{vuln.recommendation}</p>
                        </div>
                        {vuln.quantumRisk && (
                          <div className="mt-2 text-xs font-medium opacity-75">
                            ⚠️ Quantum Risk: Yes
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle2 className="w-5 h-5" />
                <span>No vulnerabilities detected. Certificate looks secure!</span>
              </div>
            </div>
          )}

          {result.recommendations && result.recommendations.length > 0 && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="font-semibold text-gray-900 mb-2">
                📋 Recommendations
              </h5>
              <ul className="space-y-1">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex gap-2">
                    <span>✓</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
