import { useState } from 'react';
import { encryptMessage } from '../../services/playgroundService';
import { EncryptionResult } from '../../types/qday.types';

export default function EncryptionPanel() {
  const [message, setMessage] = useState('Hello, my bank password is secret123!');
  const [algorithm, setAlgorithm] = useState('RSA');
  const [keySize, setKeySize] = useState(512);
  const [result, setResult] = useState<EncryptionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEncrypt = async () => {
    if (!message.trim()) {
      setError('Please enter a message to encrypt');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const encryptionResult = await encryptMessage(
        message,
        algorithm,
        keySize
      );
      setResult(encryptionResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Encryption failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">🔐 Encryption Panel</h2>

      {/* Message Input */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder="Enter message to encrypt..."
        />
        <p className="text-xs text-gray-500 mt-1">Character count: {message.length}</p>
      </div>

      {/* Algorithm Selection */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Algorithm</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="RSA">RSA (Vulnerable)</option>
            <option value="Kyber">CRYSTALS-Kyber (Safe)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Key Size</label>
          <select
            value={keySize}
            onChange={(e) => setKeySize(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {algorithm === 'RSA' ? (
              <>
                <option value={512}>RSA-512 (Demo - Very Weak)</option>
                <option value={1024}>RSA-1024 (Weak)</option>
                <option value={2048}>RSA-2048 (Moderate)</option>
                <option value={4096}>RSA-4096 (Strong)</option>
              </>
            ) : (
              <>
                <option value={512}>Kyber-512</option>
                <option value={768}>Kyber-768 (Recommended)</option>
                <option value={1024}>Kyber-1024</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* Encrypt Button */}
      <button
        onClick={handleEncrypt}
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Encrypting...' : '🔒 Encrypt'}
      </button>

      {/* Error Message */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm">
          {error}
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
          <h3 className="font-semibold text-gray-900">Encryption Result:</h3>

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Algorithm</p>
            <p className="font-mono text-sm text-gray-900">{result.algorithm}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Encryption Time</p>
            <p className="font-mono text-sm text-gray-900">{result.encryptionTimeMs}ms</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Ciphertext (Encrypted)</p>
            <div className="font-mono text-xs text-gray-700 break-all bg-white p-2 rounded border border-gray-200 max-h-24 overflow-y-auto">
              {result.ciphertext}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
            <strong>Note:</strong> To decrypt this message, someone would need the private key. 
            With quantum computers, they could derive the private key from the public key using Shor's algorithm.
          </div>
        </div>
      )}
    </div>
  );
}
