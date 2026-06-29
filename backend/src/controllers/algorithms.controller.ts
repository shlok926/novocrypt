import { Request, Response } from 'express';

export const algorithmController = {
  listAlgorithms: (req: Request, res: Response) => {
    const algorithms = [
      {
        id: 'rsa-2048',
        name: 'RSA-2048',
        category: 'classical',
        keySize: 2048,
        securityLevel: 'High (for now)',
        postQuantumSafe: false,
        description: 'Traditional RSA encryption',
      },
      {
        id: 'rsa-4096',
        name: 'RSA-4096',
        category: 'classical',
        keySize: 4096,
        securityLevel: 'Very High (for now)',
        postQuantumSafe: false,
        description: 'Extended RSA encryption',
      },
      {
        id: 'ecc-256',
        name: 'ECC-256',
        category: 'classical',
        keySize: 256,
        securityLevel: 'High (for now)',
        postQuantumSafe: false,
        description: 'Elliptic Curve Cryptography',
      },
      {
        id: 'kyber',
        name: 'CRYSTALS-Kyber',
        category: 'post-quantum',
        keySize: 3072,
        securityLevel: 'Post-Quantum Safe',
        postQuantumSafe: true,
        description: 'NIST-approved key encapsulation mechanism',
      },
      {
        id: 'dilithium',
        name: 'CRYSTALS-Dilithium',
        category: 'post-quantum',
        keySize: 2560,
        securityLevel: 'Post-Quantum Safe',
        postQuantumSafe: true,
        description: 'NIST-approved digital signature',
      },
      {
        id: 'falcon',
        name: 'FALCON',
        category: 'post-quantum',
        keySize: 897,
        securityLevel: 'Post-Quantum Safe',
        postQuantumSafe: true,
        description: 'Lattice-based digital signature',
      },
      {
        id: 'sphincs',
        name: 'SPHINCS+',
        category: 'post-quantum',
        keySize: 64,
        securityLevel: 'Post-Quantum Safe',
        postQuantumSafe: true,
        description: 'Hash-based digital signature',
      },
    ];

    res.json(algorithms);
  },

  compareAlgorithms: (req: Request, res: Response) => {
    const comparison = [
      {
        algorithm: 'RSA-2048',
        classicalComplexity: 'O(2^n)',
        quantumComplexity: 'O(log³ n)',
        keySize: 2048,
        postQuantumSafe: false,
      },
      {
        algorithm: 'ECC-256',
        classicalComplexity: 'O(√n)',
        quantumComplexity: 'O(√n)',
        keySize: 256,
        postQuantumSafe: false,
      },
      {
        algorithm: 'Kyber-768',
        classicalComplexity: 'O(n³)',
        quantumComplexity: 'O(n³)',
        keySize: 2400,
        postQuantumSafe: true,
      },
      {
        algorithm: 'Dilithium',
        classicalComplexity: 'O(n²)',
        quantumComplexity: 'O(n²)',
        keySize: 2544,
        postQuantumSafe: true,
      },
    ];

    res.json(comparison);
  },

  getNISTStandards: (req: Request, res: Response) => {
    const standards = [
      {
        year: 2022,
        algorithm: 'ML-KEM (CRYSTALS-Kyber)',
        type: 'Key Encapsulation Mechanism',
        description: 'Lattice-based key establishment algorithm',
      },
      {
        year: 2022,
        algorithm: 'ML-DSA (CRYSTALS-Dilithium)',
        type: 'Digital Signature Algorithm',
        description: 'Lattice-based digital signature algorithm',
      },
      {
        year: 2022,
        algorithm: 'SLH-DSA (SPHINCS+)',
        type: 'Digital Signature Algorithm',
        description: 'Hash-based digital signature algorithm',
      },
      {
        year: 2023,
        algorithm: 'FIPS 204',
        type: 'Standard',
        description: 'Module-Lattice-Based Digital Signature Standard',
      },
    ];

    res.json(standards);
  },
};
