import React from 'react';
import { Card, Tabs, Accordion } from '../components/ui';

export const Learn: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('rsa');

  const learnTabs = [
    {
      label: 'RSA Explained',
      value: 'rsa',
      content: (
        <div className="space-y-4">
          <Card>
            <h3 className="text-lg font-bold text-white mb-3">How RSA Works</h3>
            <p className="text-slate-300 mb-4">
              RSA (Rivest-Shamir-Adleman) is based on the computational difficulty of factoring large prime numbers. It works in three steps:
            </p>
            <ol className="space-y-3 text-slate-300 list-decimal list-inside">
              <li><strong>Key Generation:</strong> Choose two large primes p and q, compute n = p*q</li>
              <li><strong>Encryption:</strong> Plaintext is raised to power e (mod n)</li>
              <li><strong>Decryption:</strong> Ciphertext is raised to power d (mod n)</li>
            </ol>
          </Card>
          
          {/* RSA-specific FAQs */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white mb-3">RSA Questions</h3>
            <Accordion
              items={[
                {
                  id: 'rsa1',
                  title: 'How secure is RSA encryption today?',
                  content: 'RSA is still very secure against classical (non-quantum) attacks when using 2048-bit or larger keys. Factoring large numbers is computationally hard with current computers - would take millions of years. The vulnerability comes from FUTURE quantum computers, not present threats.',
                },
                {
                  id: 'rsa2',
                  title: 'What key size should I use for RSA?',
                  content: 'Minimum recommended: RSA-2048 (256-byte keys). For long-term security beyond 2030: RSA-4096. However, larger keys = slower encryption/decryption. Most organizations use RSA-2048 for balance. Post-quantum algorithms are faster with similar security.',
                },
                {
                  id: 'rsa3',
                  title: 'Why can\'t we just use bigger RSA keys to prevent quantum attacks?',
                  content: 'No amount of key size helps against quantum computers. Shor\'s Algorithm breaks RSA in POLYNOMIAL time (fast), regardless of key length. RSA-4096, RSA-8192, or RSA-16384 would all be broken equally fast by quantum computers. That\'s why we need fundamentally different algorithms.',
                },
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      label: "Shor's Algorithm",
      value: 'shors',
      content: (
        <div className="space-y-4">
          <Card>
            <h3 className="text-lg font-bold text-white mb-3">Quantum Attack on RSA</h3>
            <p className="text-slate-300 mb-4">
              Shor's Algorithm is a quantum algorithm that can factor large integers exponentially faster than known classical algorithms.
            </p>
            <div className="space-y-2 text-slate-300">
              <p><strong>Classical Factorization:</strong> O(2^n) - exponential time</p>
              <p><strong>Shor's Algorithm:</strong> O(log³ n) - polynomial time</p>
              <p>This means a quantum computer could break RSA-2048 in hours instead of millions of years!</p>
            </div>
          </Card>

          {/* Shor's/Quantum-specific FAQs */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white mb-3">Quantum Computing Questions</h3>
            <Accordion
              items={[
                {
                  id: 'shors1',
                  title: 'How many quantum bits (qubits) does Shor\'s Algorithm need?',
                  content: 'To break RSA-2048, approximately 20 million qubits are needed with current error rates. Today\'s quantum computers have ~100-1000 qubits. This is why we estimate 10+ years before cryptographically relevant quantum computers exist. But data harvested today could be decrypted with future quantum computers.',
                },
                {
                  id: 'shors2',
                  title: 'Will quantum computers be able to break ALL encryption methods?',
                  content: 'No. Quantum computers break algorithms based on factoring/discrete log (RSA, ECC, DH). But lattice-based algorithms (post-quantum standards) are resistant to both classical AND quantum attacks. They\'re based on mathematical problems believed hard for quantum computers.',
                },
                {
                  id: 'shors3',
                  title: 'What\'s the difference between quantum computing and post-quantum cryptography?',
                  content: 'Quantum computing = new technology (hardware). Post-quantum cryptography = new algorithms (software). Post-quantum algorithms work on CLASSICAL computers but resist QUANTUM attacks. You don\'t need quantum computers to use post-quantum encryption - it\'s just better math.',
                },
                {
                  id: 'shors4',
                  title: 'Can quantum computers break symmetric encryption (AES)?',
                  content: 'Grover\'s Algorithm makes AES-128 roughly equivalent to AES-64 against quantum computers. Solution: Use AES-256 (no practical quantum threat). But RSA, ECC, and ECDSA are completely broken by quantum computers, which is why post-quantum migration is critical.',
                },
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      label: 'HNDL Attack',
      value: 'hndl',
      content: (
        <div className="space-y-4">
          <Card>
            <h3 className="text-lg font-bold text-white mb-3">Harvest Now, Decrypt Later</h3>
            <p className="text-slate-300 mb-4">
              The HNDL attack is a critical threat where adversaries:
            </p>
            <ol className="space-y-3 text-slate-300 list-decimal list-inside">
              <li><strong>Harvest (NOW):</strong> Collect encrypted internet traffic today</li>
              <li><strong>Store:</strong> Archive the encrypted data for years</li>
              <li><strong>Decrypt (LATER):</strong> When quantum computers arrive, decrypt everything retroactively</li>
            </ol>
            <p className="text-amber-700 bg-amber-50 p-3 rounded mt-4">
              ⚠️ Data encrypted today with RSA could be at risk even if you migrate tomorrow!
            </p>
          </Card>

          {/* HNDL-specific FAQs */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white mb-3">Retroactive Decryption Questions</h3>
            <Accordion
              items={[
                {
                  id: 'hndl1',
                  title: 'How much of my current encrypted data is at risk from HNDL?',
                  content: 'ALL data encrypted with RSA/ECC today that requires confidentiality beyond 5-10 years. Specifically: financial records, medical history, trade secrets, intellectual property, government communications. Use Novocrypt\'s Risk Calculator to assess YOUR data based on sensitivity + retention period.',
                },
                {
                  id: 'hndl2',
                  title: 'Are adversaries REALLY collecting my encrypted data NOW?',
                  content: 'Yes. Intelligence agencies, criminal organizations, and competitors store encrypted communications. NSA\'s "collect it all" programs are well-documented. Assumption: hostile actors have copies of encrypted traffic for 10+ years. If you encrypt today with RSA, assume it will be decrypted in 2035.',
                },
                {
                  id: 'hndl3',
                  title: 'If I migrate to post-quantum NOW, am I protecting old data?',
                  content: 'No. Old RSA-encrypted data remains vulnerable. BUT you protect NEW data from today forward. Solution: Cryptographically re-encrypt old data with post-quantum algorithms (resource-intensive). Many organizations use hybrid: old data in vault, new data encrypted with PQC. Start migration ASAP.',
                },
                {
                  id: 'hndl4',
                  title: 'Is there any encryption that\'s safe from retroactive decryption?',
                  content: 'Only post-quantum algorithms and symmetric encryption (AES-256). Hybrid encryption (RSA + ML-KEM) provides both classical and quantum protection. One-time pads are theoretically unbreakable but impractical. Best approach: Encrypt with post-quantum algorithms TODAY to protect against HNDL.',
                },
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      label: 'Post-Quantum Crypto',
      value: 'pq',
      content: (
        <div className="space-y-4">
          <Card>
            <h3 className="text-lg font-bold text-white mb-3">NIST Post-Quantum Standards</h3>
            <p className="text-slate-300 mb-4">
              In 2022, NIST standardized the first quantum-safe algorithms:
            </p>
            <ul className="space-y-3 text-slate-300 list-disc list-inside">
              <li><strong>ML-KEM (Kyber):</strong> Key encapsulation mechanism based on lattice problems</li>
              <li><strong>ML-DSA (Dilithium):</strong> Digital signature algorithm based on lattice problems</li>
              <li><strong>SLH-DSA (SPHINCS+):</strong> Hash-based digital signature</li>
              <li><strong>FALCON:</strong> Lattice-based signature with smaller key sizes</li>
            </ul>
          </Card>

          {/* Post-Quantum-specific FAQs */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white mb-3">Post-Quantum Migration Questions</h3>
            <Accordion
              items={[
                {
                  id: 'pq1',
                  title: 'How do I decide which post-quantum algorithm to use?',
                  content: 'Use NIST-standardized algorithms (ML-KEM, ML-DSA, SLH-DSA, FALCON). For MOST use cases: ML-KEM for encryption (smallest keys, fastest) and ML-DSA for signatures (fastest). For embedded systems: FALCON (smaller signatures). See Algorithm Lab for detailed performance comparison and our Playground for hands-on testing.',
                },
                {
                  id: 'pq2',
                  title: 'Can I use hybrid encryption (RSA + post-quantum) during migration?',
                  content: 'YES - highly recommended! Both algorithms must be broken to decrypt. Provides protection against classical attacks (via RSA) AND quantum attacks (via post-quantum). Zero security compromise. Can gradually deprecate RSA over 5+ years as confidence in post-quantum grows. Start with hybrid TODAY.',
                },
                {
                  id: 'pq3',
                  title: 'What\'s my timeline for post-quantum migration?',
                  content: 'Typical: Assessment (1-3 months), Pilot (2-4 months), Implementation (3-6 months), Full rollout (6-12+ months). Total: 1-3 years for enterprises. Compliance deadlines vary: NSA CAP Suite by 2033, financial institutions by 2030. Start NOW - most organizations are behind schedule. Use Migration Planner for custom roadmap.',
                },
                {
                  id: 'pq4',
                  title: 'Are there compliance/regulatory requirements for post-quantum migration?',
                  content: 'Yes. NIST SP 800-222 (quantum migration guide), NSA CAP Suite (gov/defense by 2033), PCI-DSS 4.0 (financial), HIPAA (healthcare), EU Cybersecurity Act. Your industry may have specific deadlines. Novocrypt\'s Compliance Checker identifies YOUR organization\'s specific requirements automatically.',
                },
                {
                  id: 'pq5',
                  title: 'Will post-quantum algorithms remain secure in 20+ years?',
                  content: 'Lattice problems have resisted cryptanalysis for 30+ years with no quantum speedup found. NIST thoroughly vetted these algorithms. But math evolves: monitor NIST updates annually, plan algorithm refresh every 5-10 years, use modular code for algorithm agility. Post-quantum gives you 20+ year protection TODAY.',
                },
              ]}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-transparent py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Learning Center</h1>

        <Card>
          <Tabs tabs={learnTabs} />
        </Card>
      </div>
    </div>
  );
};
