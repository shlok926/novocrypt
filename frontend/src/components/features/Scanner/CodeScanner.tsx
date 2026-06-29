import React, { useState } from 'react';
import { Loader2, AlertCircle, CheckCircle2, Copy } from 'lucide-react';
import scannerService from '@/services/scannerService';
import { ScanResult, CodeVulnerability } from '@/types/scanner.types';

type Language = 'javascript' | 'typescript' | 'python' | 'java' | 'csharp';

export const CodeScanner: React.FC = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<Language>('javascript');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('Please paste some code to scan');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const scanResult = await scannerService.scanCodeSnippet(code, language);
      setResult(scanResult);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to scan code snippet'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy code');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCode(text);
      setError('');
    } catch {
      setError('Failed to read from clipboard');
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

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          🔍 Code Vulnerability Scanner
        </h3>

        <form onSubmit={handleScan} className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={handlePaste}
                disabled={loading}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 flex items-center gap-2 transition"
              >
                <Copy className="w-4 h-4" />
                Paste
              </button>
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
                  'Scan Code'
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Code Snippet
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here... (e.g., const crypto = require('crypto'); const cipher = crypto.createCipher('des', key);)"
              disabled={loading}
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="mt-2 text-xs text-gray-600">
              {code.length} characters
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
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-gray-900">Scan Results</h4>
                <p className="text-sm text-gray-600">{language}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {result.securityScore || 0}%
                </div>
                <p className="text-xs text-gray-600">Security Score</p>
              </div>
            </div>
          </div>

          {result.vulnerabilities && result.vulnerabilities.length > 0 ? (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">
                Issues Found: {result.vulnerabilities.length}
              </h4>
              {(result.vulnerabilities as CodeVulnerability[]).map(
                (vuln, idx) => (
                  <div
                    key={idx}
                    className={`p-4 border rounded-lg ${getSeverityColor(
                      vuln.severity
                    )}`}
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-semibold">{vuln.pattern}</h5>
                            <p className="text-xs mt-1">Line {vuln.line}</p>
                          </div>
                          <span className="text-xs px-2 py-1 bg-white bg-opacity-50 rounded font-medium">
                            {vuln.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm mt-2">{vuln.description}</p>
                        <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                          <p className="text-sm font-medium">🔧 Fix:</p>
                          <code className="block text-xs mt-1 bg-black bg-opacity-10 p-2 rounded font-mono whitespace-pre-wrap break-words">
                            {vuln.fix}
                          </code>
                        </div>
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
                <span>No cryptographic vulnerabilities detected!</span>
              </div>
            </div>
          )}

          {result.remediationSteps && result.remediationSteps.length > 0 && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="font-semibold text-gray-900 mb-2">
                🛠️ Remediation Steps
              </h5>
              <ol className="space-y-2">
                {result.remediationSteps.map((step, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex gap-3">
                    <span className="font-semibold text-blue-600">
                      {idx + 1}.
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
