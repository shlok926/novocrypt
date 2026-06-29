import { Request, Response } from 'express';

export const contentController = {
  getQdayStats: (req: Request, res: Response) => {
    const stats = {
      estimatedQday: 2035,
      yearsRemaining: 2035 - new Date().getFullYear(),
      quantumComputersBuilt: 0,
      cryptoVulnerableDataStored: '1.7 Zettabytes',
      hnldAttacksDetected: 5,
      organizationsAtRisk: '95%',
      mandateDate: '2030 (US Federal)',
    };

    res.json(stats);
  },

  getThreats: (req: Request, res: Response) => {
    const threats = [
      {
        id: 'hndl',
        name: 'Harvest Now, Decrypt Later (HNDL)',
        description:
          'Adversaries collect encrypted data today and decrypt it when quantum computers arrive.',
        severity: 'Critical',
        impact: 'All encrypted communication',
      },
      {
        id: 'rsa-vulnerable',
        name: 'RSA Vulnerability',
        description:
          'RSA encryption can be broken by quantum computers running Shor\'s algorithm in polynomial time.',
        severity: 'Critical',
        impact: 'All systems using RSA-2048 and below',
      },
      {
        id: 'ecc-vulnerable',
        name: 'ECC Vulnerability',
        description:
          'Elliptic Curve Cryptography is also vulnerable to quantum attacks via Shor\'s algorithm.',
        severity: 'High',
        impact: 'Modern TLS/SSL certificates',
      },
      {
        id: 'crypto-agility',
        name: 'Crypto Agility Gaps',
        description:
          'Many systems cannot quickly switch to post-quantum algorithms due to infrastructure limitations.',
        severity: 'High',
        impact: 'Enterprise systems, legacy infrastructure',
      },
    ];

    res.json(threats);
  },

  getArticles: (req: Request, res: Response) => {
    const articles = [
      {
        id: 1,
        title: 'Understanding Shor\'s Algorithm',
        excerpt:
          'How quantum computers will break RSA encryption using polynomial time factorization.',
        readTime: '5 min',
      },
      {
        id: 2,
        title: 'Post-Quantum Cryptography Standards',
        excerpt: 'NIST-approved algorithms for quantum-safe encryption.',
        readTime: '7 min',
      },
      {
        id: 3,
        title: 'Migration Roadmap for Enterprises',
        excerpt:
          'A practical guide to planning your organization\'s quantum-safe migration.',
        readTime: '10 min',
      },
    ];

    res.json(articles);
  },
};
