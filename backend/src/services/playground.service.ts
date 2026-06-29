import forge from 'node-forge';

export interface EncryptionResult {
  algorithm: string;
  keySize: number;
  plaintext: string;
  ciphertext: string;
  key: {
    publicKey: string;
    privateKey?: string;
  };
  encryptionTimeMs: number;
}

export interface DecryptionResult {
  algorithm: string;
  keySize: number;
  ciphertext: string;
  plaintext: string;
  decryptionTimeMs: number;
  method: 'classical' | 'quantum';
}

export interface QuantumAttackSimulation {
  algorithm: string;
  keySize: number;
  steps: string[];
  estimatedTimeClassical: string;
  estimatedTimeQuantum: string;
  factors: {
    p: number;
    q: number;
    n: number;
    phi: number;
  };
}

/**
 * Generate RSA key pair
 */
export function generateRSAKeyPair(keySize: number): { publicKey: string; privateKey: string } {
  const start = Date.now();

  // Generate RSA key pair
  const rsa = forge.pki.rsa;
  const keypair = rsa.generateKeyPair({ bits: keySize, workers: 1 });

  // Convert to PEM format
  const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
  const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);

  return {
    publicKey: publicKeyPem.substring(0, 100) + '...',
    privateKey: privateKeyPem.substring(0, 100) + '...',
  };
}

/**
 * Encrypt message with RSA
 */
export function encryptWithRSA(message: string, keySize: number): EncryptionResult {
  const start = Date.now();

  try {
    // Generate key pair for demo
    const rsa = forge.pki.rsa;
    const keypair = rsa.generateKeyPair({ bits: keySize, workers: 1 });

    // Encrypt message
    const encrypted = keypair.publicKey.encrypt(message);
    const ciphertext = forge.util.encode64(encrypted);

    const encryptionTimeMs = Date.now() - start;

    return {
      algorithm: `RSA-${keySize}`,
      keySize,
      plaintext: message,
      ciphertext: ciphertext.substring(0, 100) + (ciphertext.length > 100 ? '...' : ''),
      key: {
        publicKey: forge.pki.publicKeyToPem(keypair.publicKey).substring(0, 100) + '...',
      },
      encryptionTimeMs,
    };
  } catch (error) {
    throw new Error(`RSA encryption failed: ${error}`);
  }
}

/**
 * Decrypt RSA ciphertext (simulated)
 */
export function decryptWithRSA(ciphertext: string, keySize: number): DecryptionResult {
  const start = Date.now();
  const decryptionTimeMs = Date.now() - start;

  // In real scenario, would need the private key
  // For demo, we show the decryption time
  return {
    algorithm: `RSA-${keySize}`,
    keySize,
    ciphertext: ciphertext.substring(0, 50) + '...',
    plaintext: '[Decrypted message would appear here with private key]',
    decryptionTimeMs,
    method: 'classical',
  };
}

/**
 * Encrypt with CRYSTALS-Kyber (simulated)
 * In production, use liboqs or similar
 */
export function encryptWithKyber(message: string, variant: string): EncryptionResult {
  const start = Date.now();

  // Simulate Kyber encryption
  const messageBytes = forge.util.encodeUtf8(message);
  const keySize = variant === 'Kyber-512' ? 512 : variant === 'Kyber-768' ? 768 : 1024;

  // Create simulated ciphertext
  const ciphertext = forge.util.encode64(messageBytes + Math.random().toString());

  const encryptionTimeMs = Date.now() - start;

  return {
    algorithm: variant,
    keySize,
    plaintext: message,
    ciphertext: ciphertext.substring(0, 100) + (ciphertext.length > 100 ? '...' : ''),
    key: {
      publicKey: `${variant} public key (${keySize} bytes)`,
    },
    encryptionTimeMs,
  };
}

/**
 * Simulate Shor's algorithm quantum attack on RSA
 */
export function simulateShorsAlgorithm(
  keySize: number
): QuantumAttackSimulation {
  // For demo purposes, use small numbers
  // In reality, Shor's algorithm would find factors of n
  const p = Math.floor(Math.random() * 100000) + 1000;
  const q = Math.floor(Math.random() * 100000) + 1000;
  const n = p * q;
  const phi = (p - 1) * (q - 1);

  const steps = [
    `1. Choose random a = ${Math.floor(Math.random() * n)}`,
    `2. Compute GCD(a, n) = 1`,
    `3. Find order r of a^x mod ${n} using Quantum Period Finding`,
    `4. If r is even, compute GCD(a^(r/2) ± 1, n)`,
    `5. Factors found: p = ${p}, q = ${q}`,
    `6. Compute φ(n) = (p-1)(q-1) = ${phi}`,
    `7. Find e and d such that e*d ≡ 1 (mod φ(n))`,
    `8. Successfully recovered private key!`,
  ];

  const estimatedTimes: Record<number, { classical: string; quantum: string }> = {
    512: {
      classical: 'Few seconds (already broken)',
      quantum: '< 1 second',
    },
    1024: {
      classical: 'Millions of years',
      quantum: 'Minutes',
    },
    2048: {
      classical: '10^30 years',
      quantum: 'Hours to days',
    },
    4096: {
      classical: '10^100+ years',
      quantum: 'Days to weeks',
    },
  };

  const times = estimatedTimes[keySize] || estimatedTimes[2048];

  return {
    algorithm: `RSA-${keySize}`,
    keySize,
    steps,
    estimatedTimeClassical: times.classical,
    estimatedTimeQuantum: times.quantum,
    factors: {
      p,
      q,
      n,
      phi,
    },
  };
}

/**
 * Get encryption algorithm recommendations
 */
export function getAlgorithmRecommendations(): {
  vulnerable: Array<{ algorithm: string; reason: string; replacement: string }>;
  safe: Array<{ algorithm: string; reason: string }>;
} {
  return {
    vulnerable: [
      {
        algorithm: 'RSA-512',
        reason: 'Already broken, even classically. DO NOT USE.',
        replacement: 'CRYSTALS-Kyber-768',
      },
      {
        algorithm: 'RSA-1024',
        reason: 'Vulnerable to quantum attacks. Can be broken in 1-5 years with quantum computer.',
        replacement: 'CRYSTALS-Kyber-768',
      },
      {
        algorithm: 'RSA-2048',
        reason: 'Moderate quantum risk. Vulnerable within 5-10 years.',
        replacement: 'CRYSTALS-Kyber-768 or RSA-4096 (temporary)',
      },
      {
        algorithm: 'MD5',
        reason: 'Cryptographically broken. Collision attacks feasible.',
        replacement: 'SHA-256 or SHA-3',
      },
      {
        algorithm: 'SHA-1',
        reason: 'Vulnerable to collision attacks. Deprecated.',
        replacement: 'SHA-256 or SHA-3',
      },
    ],
    safe: [
      {
        algorithm: 'RSA-4096',
        reason: 'Temporarily safe. Use as transition measure.',
      },
      {
        algorithm: 'CRYSTALS-Kyber-768',
        reason: 'NIST-standardized post-quantum algorithm. Recommended for production.',
      },
      {
        algorithm: 'CRYSTALS-Dilithium-3',
        reason: 'Post-quantum digital signatures. NIST standard.',
      },
      {
        algorithm: 'SHA-256',
        reason: 'Secure hash. Quantum-resistant at this size.',
      },
      {
        algorithm: 'AES-256',
        reason: 'Symmetric encryption. Secure against current and quantum threats.',
      },
    ],
  };
}

/**
 * Compare encryption speeds
 */
export function compareEncryptionSpeeds(): Array<{
  algorithm: string;
  keySize: number;
  estimatedTimeMs: number;
  quantumVulnerable: boolean;
}> {
  return [
    {
      algorithm: 'RSA-512',
      keySize: 512,
      estimatedTimeMs: 5,
      quantumVulnerable: true,
    },
    {
      algorithm: 'RSA-1024',
      keySize: 1024,
      estimatedTimeMs: 20,
      quantumVulnerable: true,
    },
    {
      algorithm: 'RSA-2048',
      keySize: 2048,
      estimatedTimeMs: 80,
      quantumVulnerable: true,
    },
    {
      algorithm: 'RSA-4096',
      keySize: 4096,
      estimatedTimeMs: 300,
      quantumVulnerable: true,
    },
    {
      algorithm: 'CRYSTALS-Kyber-768',
      keySize: 768,
      estimatedTimeMs: 15,
      quantumVulnerable: false,
    },
    {
      algorithm: 'CRYSTALS-Kyber-1024',
      keySize: 1024,
      estimatedTimeMs: 25,
      quantumVulnerable: false,
    },
    {
      algorithm: 'AES-256',
      keySize: 256,
      estimatedTimeMs: 3,
      quantumVulnerable: false,
    },
  ];
}
