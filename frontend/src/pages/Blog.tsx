import React from 'react';
import { Card } from '../components/ui';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: 'threat' | 'case-study' | 'tips' | 'educational';
  readTime: number;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The 2033 Deadline Is Closer Than You Think: NSA\'s Quantum Cryptography Mandate and What It Means for Your Business',
    excerpt: 'The NSA\'s Commercial National Security Algorithm Suite 2.0 (CNSA 2.0) isn\'t just government policy—it\'s forcing a fundamental shift in how enterprises protect data. If you\'re not preparing now, you\'re already behind.',
    content: `I sat down with a CTO at a Fortune 500 financial firm last month, and she admitted something most security leaders won't: "We have no idea how long our RSA migration will take."

That conversation crystallized something I've been hearing repeatedly. While NIST officially standardized post-quantum algorithms in August 2024, most organizations are treating this as a future problem. It isn't.

THE REAL DEADLINE

The NSA's CNSA 2.0 mandate sets 2033 as the compliance deadline—that's 7 years away. On paper, it sounds manageable. In reality? Most large enterprises are discovering they need 3-5 years just for assessment and pilot phases.

Here's what organizations I've worked with are finding:

Assessment Phase (Months 1-3): Crypto asset discovery, dependency mapping, compliance documentation

Pilot Phase (Months 4-8): Test hybrid encryption, validate third-party integrations, train development teams

Migration Phase (Months 9-24): Gradual key rollover, certificate updates, infrastructure changes

Validation and Hardening (Months 25+): Monitoring, incident response updates

That's not 2033 anymore. That's 2028-2029 at best.

WHY THIS MATTERS BEYOND COMPLIANCE

The real threat is the "Harvest Now, Decrypt Later" (HNDL) attack pattern. Intelligence agencies are collecting encrypted communications today, storing them indefinitely. This data remains encrypted only because today's computers can't break RSA.

When quantum computers reach cryptographically relevant sizes, every byte of encrypted data collected today becomes vulnerable to retroactive decryption. Your 2026 customer data? Decrypted in 2036. Your 2024 intellectual property? Exposed in 2031.

WHAT YOU SHOULD DO THIS QUARTER

1. Run crypto asset inventory: Catalog every RSA key and ECC certificate
2. Identify high-value data: Financial forecasts, M&A documents, trade secrets
3. Test NIST-approved algorithms: ML-KEM for key encapsulation
4. Plan hybrid encryption pilots: Running RSA AND ML-KEM simultaneously
5. Budget for contingency: Companies budget 15-25% extra

THE REALITY CHECK

Your RSA keys from 2015 are still secure against classical computers. Your systems aren't broken. But your data's future confidentiality window is closing faster than most realize.

The organizations that start now won't be scrambling in 2032. The organizations waiting? They'll be explaining to their boards why a critical security requirement became a crisis.`,
    author: 'James Mitchell',
    date: '2026-05-15',
    category: 'threat',
    readTime: 8,
    image: '🛡️',
    featured: true,
  },
  {
    id: '2',
    title: 'How One Bank Migrated 87,000 Cryptographic Keys Without Breaking a Single API',
    excerpt: 'A mid-sized financial institution completed their post-quantum cryptography migration in 18 months with zero downtime. Here\'s exactly how they did it.',
    content: `"Our biggest fear was that migrating 87,000 keys would require a maintenance window," the VP of Infrastructure told me. "Turns out, the real problem wasn't the migration—it was finding all the keys in the first place."

THE SCOPE SURPRISE

When they started their inventory in Q4 2025, they expected 15,000 active keys. They found 87,000.

Where were they?
- 23,000 in legacy payment processing systems (some from 2008-era infrastructure)
- 18,000 in certificate stores across acquired subsidiaries
- 12,000 in development and test environments (never decommissioned)
- 11,000 in backup systems marked "read-only"
- 10,000 in third-party integration points
- 7,000 in legacy employee authentication systems
- 6,000 scattered across individual workstations

Their first 3 months were pure discovery—no migration work, just accounting.

THE HYBRID APPROACH THAT WORKED

Rather than rip-and-replace, they chose "defensive layering":

Phase 1 (Months 1-6): Shadow Mode
Deploy ML-KEM alongside RSA in non-critical systems. Both encrypt, but only RSA decrypts initially. Monitor performance, find edge cases early.

Phase 2 (Months 7-12): Hybrid Production
Medium-risk systems use hybrid encryption. New systems deploy hybrid-first. No changes to public APIs.

Phase 3 (Months 13-18): Gradual RSA Deprecation
Start with non-critical data flows. Move one system at a time. Maintain RSA as backup for 6+ months after each migration.

Key Detail: They never did a "cutover." Instead, they gradually increased ML-KEM traffic from 5% to 95% over 6 months.

WHAT COST MORE THAN EXPECTED

1. Legacy System Integration: 420K (custom integration layers for 2006-era systems)
2. Third-Party Renegotiation: 280K (34 services had hard-coded RSA requirements)
3. Internal Training: 160K (developers needed 4 months with new libraries)
4. Certification and Compliance: 210K (audit firms validating the hybrid approach)

Total: 1.07M for an organization with 2.3B in assets

Was it worth it? They're now regulation-compliant for 2033 and protected against HNDL attacks on newly encrypted data.

BOTTOM LINE

This bank proved enterprise-scale post-quantum migration isn't a technical problem anymore. It's project management. They went from "87,000 keys" to full compliance with minimal disruption.`,
    author: 'Sarah Chen',
    date: '2026-05-12',
    category: 'case-study',
    readTime: 12,
    image: '💼',
  },
  {
    id: '3',
    title: 'Your Data Is Being Collected Right Now: Understanding the HNDL Attack',
    excerpt: 'Intelligence agencies are harvesting encrypted data today, betting that quantum computers will decrypt it tomorrow. Here\'s what you need to know.',
    content: `I had a conversation with a security director that shifted how I talk about quantum threats.

"If HNDL isn't a threat until quantum computers exist, why should I care now?" she asked.

I realized I've been explaining this wrong.

THE HNDL ATTACK ISN'T ABOUT BREAKING ENCRYPTION TODAY

"Harvest Now, Decrypt Later" is straightforward:

1. Shor's algorithm breaks RSA (today unbreakable, in 10-15 years readable)
2. Encrypted data is permanent (once recorded, stored indefinitely)
3. Therefore: Record encrypted data today, store indefinitely, decrypt later

This isn't theory. This is what intelligence agencies literally do. NSA documents showed systematic archiving of encrypted communications. Chinese intelligence has publicly stated they're collecting encrypted foreign communications for future analysis. Russian SVR operations have been documented storing massive volumes.

WHY THIS MATTERS MORE THAN PEOPLE REALIZE

Financial data, trade secrets, and personal information have 10-30 year confidentiality requirements. Quantum computers will arrive in that window for many records.

Your 2026 Data: Encrypted today, quantum computers arrive 2036, data vulnerable 2026-2052

Your 2024 Healthcare Records: HIPAA retention 6-10 years, quantum computers 2036, patients exposed after compliance window

Your 2023 M&A Document: Confidentiality window 5-7 years (competitive edge), quantum computers 2036, no competitive harm but data exposed

THE UNCOMFORTABLE PART

Moving to post-quantum cryptography TODAY protects your future data. It does NOT protect data encrypted last year with RSA.

Your 2025 RSA-encrypted data is already recorded somewhere—servers worldwide, backups, archives, intelligence databases.

Retroactive protection isn't possible. But you can:

1. Stop encrypting new data with RSA only (Use hybrid RSA + ML-KEM)
2. Identify high-value historical data (Customer records, IP documentation, health information)
3. Re-encrypt sensitive data still stored digitally (If data is 10 years old but still stored, re-encrypt now)
4. Accept that some data will be exposed (Short confidentiality windows are already compromised)

BOTTOM LINE

HNDL isn't a future threat. It's a current threat with future consequences. The only question is whether you'll be using post-quantum cryptography by then.`,
    author: 'Dr. Michael Rodriguez',
    date: '2026-05-10',
    category: 'threat',
    readTime: 10,
    image: '⚠️',
  },
  {
    id: '4',
    title: 'Deploy Quantum-Safe Encryption in 90 Days: A Practical Roadmap That Actually Works',
    excerpt: 'If your organization is still using RSA-only encryption, here\'s a battle-tested 90-day plan to get quantum-safe cryptography running.',
    content: `I sat in a board meeting where the CTO promised "post-quantum compliance in 18 months."

The board approved it. Six months later, they'd completed 3% of the work. Not because it was hard, but because they approached it like a single project instead of phased rollout.

Here's a 90-day plan that actually works.

PHASE 1: ASSESSMENT (Days 1-30)

Week 1-2: Data Classification
List every system handling encrypted data. Classify by risk: Critical, High, Medium, Low.

Critical: Customer authentication, payment processing, data at rest
High: Internal communications, access credentials
Medium: Logs, non-sensitive operational data
Low: Public information

Week 3: Dependencies and Blockers
For each critical system, identify: What breaks if we change encryption? What third-party services depend on current keys? Blast radius?

This usually reveals 3-5 blocker systems.

Week 4: Quick Wins
Identify 2-3 medium-risk systems with no dependencies. These become pilot projects.

PHASE 2: PILOTS (Days 31-60)

Week 5-6: Hybrid Encryption Implementation
Pick first pilot system. Non-critical. Deploy ML-KEM alongside RSA. Both encrypt. Decryption works with either algorithm.

Key: You're layering ML-KEM on top, not replacing RSA. Backwards compatible. Reversible.

Week 7-8: Monitor and Refine
Run for 2 weeks. Monitor: Performance (usually less than 5% overhead), error rates, operational overhead.

You'll find 1-2 integrations that break unexpectedly. Better now than in production.

PHASE 3: QUICK ROLLOUT (Days 61-90)

Week 9: One Production System
Choose high-value but non-critical production system. Deploy hybrid encryption. Run 2 weeks with close monitoring.

Week 10-12: Scale to Critical Systems
Medium-priority: 1 per week. Critical systems: Staged deployment (25% to 50% to 75% to 100%).

SUCCESS METRICS BY DAY 90

- Percentage of critical infrastructure hybrid-encrypted
- Hybrid encryption proven in production
- Clear understanding of blockers to full migration
- Your team knows how to deploy PQC

Start this week.`,
    author: 'Alex Thompson',
    date: '2026-05-08',
    category: 'tips',
    readTime: 7,
    image: '🚀',
  },
  {
    id: '5',
    title: 'Lattice-Based Cryptography: Why The Math Behind ML-KEM Makes It Quantum-Resistant',
    excerpt: 'If you\'ve wondered why lattice-based cryptography is the foundation of post-quantum standards, here\'s the mathematical intuition without the PhD.',
    content: `Here's what most cryptography explanations get wrong: They make math more complicated than it is.

RSA works because multiplying numbers is easy, factoring is hard. Intuitive.

Lattice-based cryptography works on a similar principle: Easy direction and hard direction. But the intuition is less obvious.

THE LATTICE INTUITION (ACTUALLY SIMPLE)

Imagine a 2D grid of points. In cryptography, we work with 256 or 512 dimensions, but the principle is the same.

Easy Direction: If I give you a short vector and a grid, you can easily find that vector in the grid.

Hard Direction: If I give you a noisy vector (I add random noise), finding the underlying grid from that noisy vector is incredibly hard—even for a quantum computer.

ML-KEM exploits this asymmetry.

HOW ML-KEM WORKS

Step 1: Bob Creates a Public Key
Bob chooses a secret vector (his private key). Bob multiplies it by a matrix to create a noisy version. Bob publishes the noisy version as his public key. The secret vector is hidden in the noise.

Step 2: Alice Encrypts a Secret
Alice takes Bob's public key. Alice creates her own noisy vector. Alice combines her noise with Bob's noise. Alice encodes her secret message in the combined noise.

Step 3: Bob Decrypts
Bob knows his secret vector. Bob can subtract out his noise from the combined noise. Alice's secret message emerges. Bob reads the message.

Security: An eavesdropper sees noise. They don't know Bob's secret vector, so they can't separate the layers of noise. Quantum computers can't break it because there's no group structure for quantum interference to exploit.

WHY THIS STOPS QUANTUM COMPUTERS

Shor's algorithm demolishes RSA using quantum interference. But lattice problems are different:

1. No underlying group structure for quantum interference to exploit
2. Problem is about finding the shortest vector in a lattice or patterns in noise
3. Quantum computers offer at most polynomial speedup (like 2x faster)
4. So quantum computers still need exponential time

WHY SIZE MATTERS

Lattice-based cryptography has larger keys than RSA.

RSA-2048: 256 bytes public key
ML-KEM-768: 1,184 bytes public key

That's about 5x bigger. Why? The noise must be big enough to make finding it genuinely hard, but small enough Bob can recover it.

For modern networks, this is fine. 5x bigger is still kilobytes. Performance impact is minimal.

THE REAL INSIGHT

NIST chose ML-KEM because:
1. It provably works (30+ years of cryptanalysis)
2. It resists all known attacks (classical, quantum, speculative)
3. Performance is reasonable (fast encryption/decryption, acceptable key sizes)
4. It's practical to deploy (doesn't require exotic hardware)

This isn't a gamble. It's mathematics. Start migrating today.`,
    author: 'Dr. Priya Sharma',
    date: '2026-05-05',
    category: 'educational',
    readTime: 9,
    image: '📐',
  },
  {
    id: '6',
    title: 'Hybrid Encryption Done Right: The Technical Blueprint Every Developer Needs',
    excerpt: 'Hybrid encryption (RSA + ML-KEM) isn\'t just a compliance requirement—it\'s defense-in-depth. Here\'s how to implement it correctly.',
    content: `Most developers approach hybrid encryption wrong.

They think: Use RSA AND ML-KEM—if one is broken, the other protects you.

That's the spirit, but the implementation matters enormously. Get it wrong, and you've just doubled your attack surface.

THE RIGHT ARCHITECTURE PATTERN

WRONG Way: Ciphertext equals RSA encrypted plaintext plus ML-KEM encrypted plaintext. Decryption requires BOTH. If either is broken, data is exposed.

RIGHT Way:
1. Generate random session key (256 bytes)
2. Encrypt session key with RSA
3. Encrypt session key with ML-KEM
4. Encrypt plaintext with session key using AES-256-GCM
5. Send: RSA-encrypted session key, ML-KEM-encrypted session key, AES-GCM encrypted plaintext

To decrypt: Decrypt session key using RSA OR decrypt session key using ML-KEM. Then decrypt plaintext using the recovered session key.

Why this is better:
- Actual data encrypted once with AES (quantum-resistant by design)
- Both RSA and ML-KEM protect the session key
- If RSA is broken: Use ML-KEM to recover key. Data still protected.
- If ML-KEM is broken: Use RSA to recover key. Data still protected.
- If BOTH are broken: You have bigger problems.

PERFORMANCE EXPECTATIONS

Encryption Overhead:
- RSA encryption: 1ms
- ML-KEM encryption: 0.5ms
- AES-256-GCM: Microseconds
- Total: 2-3ms per encryption

Decryption Overhead:
- RSA decryption: 50ms
- ML-KEM decryption: 2ms
- AES-256-GCM decryption: Microseconds
- Total: 52ms if RSA succeeds, 2ms if ML-KEM succeeds

Network Overhead:
- RSA-encrypted session key: 256 bytes
- ML-KEM-encrypted session key: 1,088 bytes
- Plus IV and tag: 100 bytes
- Total: 1.5KB overhead per message

For most applications, this is negligible.

THE FALLBACK STRATEGY (CRITICAL)

What if ML-KEM is broken? Or RSA?

Current approach: Try RSA first, fallback to ML-KEM

This ensures:
- If RSA compromised: ML-KEM still works
- If ML-KEM compromised: RSA still works
- You have time to migrate before needing both simultaneously

COMPLIANCE NOTE

Using hybrid encryption means:
- Classical cryptography (RSA) passes current compliance
- Post-quantum cryptography (ML-KEM) passes future compliance
- Documented approach regulators understand

This combination is what major financial institutions and government agencies deploy.

START HERE

1. Don't roll your own ML-KEM—Use approved libraries
2. Use AES-256-GCM for symmetric encryption
3. Encrypt the session key with both RSA and ML-KEM
4. Document your key rotation policy (rotate ML-KEM every 2-3 years initially)
5. Test failure scenarios (what if RSA decryption fails?)`,
    author: 'David Park',
    date: '2026-05-01',
    category: 'tips',
    readTime: 8,
    image: '💻',
  },
  {
    id: '7',
    title: 'Quantum Hardware Progress Update: We\'re Closer to Breaking RSA Than Most Realize',
    excerpt: 'IBM reached 1,000+ qubits. Google achieved quantum advantage. Here\'s what this actually means for cryptography.',
    content: `Last month, I asked a quantum hardware engineer: "How close are we?"

She laughed. "Closer than the headlines say, but not as close as the panic suggests."

CURRENT STATE (Q2 2026)

IBM Quantum System Two: 1,121 qubits
Google Willow: 105 qubits (better error correction)
IonQ: 36 qubits (highest quality)
Atom Computing: 50+ neutral atom qubits

The headline numbers are impressive but misleading. A 1,000-qubit system that can't run complex algorithms is less useful than a 100-qubit system with strong error correction.

Quality matters more than quantity.

WHAT MATTERS FOR CRYPTANALYSIS

To break RSA-2048 using Shor's algorithm, you need:

Logical qubits needed: 2,330
Physical qubits needed with error correction: 20 million

That's a massive gap. The conversion ratio is called "error correction overhead." Today, we need roughly 10,000 physical qubits per logical qubit.

Translation: We need 20 million physical qubits with good error correction. We have maybe 5,000-10,000 usable qubits globally.

That's a 2,000-4,000x gap.

THE ERROR CORRECTION PROBLEM (THE REAL BOTTLENECK)

Quantum computers are noisy. Qubits decohere. Operations fail.

Current Reality:
- IBM: 0.001-0.1% error rate per gate
- Google: 0.1-0.3% error rate (world-class)
- IonQ: Less than 0.1% error rate (best in industry)

What We Need for Shor's Algorithm:
- Error rate: Less than 0.0001%
- We need to be 1,000-10,000x better than current

This is the fundamental barrier.

THE TIMELINE (REALISTIC ASSESSMENT)

2026-2028: Incremental Progress
Qubit counts increase to 2,000+, error rates improve 10x. No cryptographically relevant quantum computer yet.

2029-2032: The Threshold Approach
Qubit counts exceed 5,000 with error rates under 0.1%. Error correction starts working. First proof-of-concept on small keys.

2032-2035: The Window
Quantum computers reach 10,000+ usable qubits. Error correction becomes practical. Shor's algorithm demonstration against 2048-bit RSA (weeks to months). 2024-2026 encrypted data becomes vulnerable.

2035+: Post-Quantum Cryptography Essential
Large-scale cryptanalysis possible. Historical data decryption happening. RSA deprecated.

WHY THIS DOESN'T MEAN "DON'T PANIC"

Your company stores customer data with 7-year retention. You encrypt it today with RSA (2026). Retention expires (2033). Quantum computers break RSA (2034). Your data is exposed (2034).

Compliance met, reputation destroyed.

Healthcare record encrypted 2026, HIPAA retention 6 years (until 2032), quantum breakthrough 2034, patient data exposed. Lawsuit.

Don't panic. Do plan. Do start this year.`,
    author: 'Jennifer Walsh',
    date: '2026-04-28',
    category: 'threat',
    readTime: 8,
    image: '🔬',
  },
  {
    id: '8',
    title: 'Your Post-Quantum Compliance Roadmap: What PCI-DSS, HIPAA, and SEC Actually Require',
    excerpt: 'Regulatory requirements for post-quantum cryptography are scattered across multiple agencies. Here\'s what you actually need to do based on your sector.',
    content: `I spent a frustrating week reading compliance documentation for five agencies.

They use different terminology. Different timelines. Different threat models.

But there's a pattern.

THE REGULATORY LANDSCAPE

NIST SP 800-222 (National Standards)
Published 2024, scope US government and contractors, timeline 2026-2032, key point: Begin crypto agility planning now

NSA CAP Suite 2.0 (Defense/Intelligence)
Published 2024, very strict, timeline full adoption by 2033

PCI-DSS 4.0 (Financial)
Published 2022, enforcement starting 2025, strong cryptography required (ML-KEM qualifies), timeline critical

HIPAA (Healthcare)
Updates coming 2025-2026, patient data confidentiality windows 10+ years

SEC Cybersecurity (Securities)
Published 2023, publicly traded companies, board-level oversight required

EU Cybersecurity Act
Published 2022, EU organizations, post-quantum obligations starting 2025

BY INDUSTRY: WHAT YOU ACTUALLY NEED

Financial Services

PCI-DSS 4.0 Requirement: Use strong cryptography. Document justification for deprecated cryptography.

Translation: You must either migrate to ML-KEM by end 2025, document your migration timeline, or document why you're not migrating.

Compliance Checklist:
- Crypto inventory completed
- Migration roadmap documented
- Board/audit committee awareness
- Third-party vendor assessment
- Pilot project in non-critical systems

Healthcare

HIPAA Requirement: Use current strong cryptography. Protects patient data with 6-10 year retention.

Why This Matters: Patient data encrypted 2024 needs protection until 2034. Quantum computers might break it by 2032-2034. Timeline overlaps.

Compliance Checklist:
- Identify data with 10+ year confidentiality windows
- Audit current encryption of historical data
- Plan hybrid encryption for new records
- Document timeline for re-encryption

Government/Defense

NSA CAP Suite 2.0: All new cryptographic systems must use CAP Suite algorithms by 2025. Existing systems must migrate by 2033.

Every government contract requires ML-KEM in new systems starting 2025. Every security clearance update questions your crypto migration timeline.

THE COMPLIANCE PATTERN (COMMON ACROSS ALL)

Despite different wording, the requirement is consistent:

1. Know your crypto (audit what you have)
2. Understand your data (which needs long-term protection?)
3. Plan your migration (realistic timelines)
4. Communicate your plan (to auditors, regulators, customers)
5. Execute in phases
6. Document everything

THE BIGGEST MISTAKE

Organizations treating compliance as "a thing we need to do in 2032."

Compliance isn't the deadline. Compliance is the checkbox at the end of migration.

If compliance is due 2033, you need to be DONE by 2032. Migration should be 2029-2031 completion. Which means start now.

PRACTICAL ACTION THIS MONTH

Contact: Your compliance officer and auditors

Ask:
1. What's our specific regulatory timeline for post-quantum crypto?
2. What documentation does our industry expect?
3. Can we schedule a roadmap review in Q3?

Then use this blog post to draft your roadmap.

Submit: To audit committee with:
- What we have (crypto inventory)
- What we need (PQC requirements)
- When we need it (deadline)
- How we'll get there (roadmap)
- Checkpoints (quarterly milestones)

Most auditors will accept this. It shows you're being methodical, not panicking.

That's what compliance actually wants.`,
    author: 'Marcus Chen',
    date: '2026-04-25',
    category: 'case-study',
    readTime: 11,
    image: '✅',
  },
  {
    id: '9',
    title: 'Shor\'s Algorithm Explained: Why RSA\'s Days Are Numbered',
    excerpt: 'Everyone says Shor\'s algorithm breaks RSA. But how? What makes it different from classical algorithms? Here\'s the intuition without the PhD.',
    content: `Here's the problem with Shor's algorithm explanations: They assume you remember quantum mechanics from college.

You don't. Most people don't.

RSA WORKS BECAUSE FACTORING IS HARD

This part is intuitive.

If I give you two prime numbers: 17 and 19.
Multiplying them is easy: 17 times 19 equals 323.

If I give you 323 and ask you to find the factors: Much harder. You have to try 2, 3, 5, 7, 11, 13, 17.

For small numbers, this is annoying. For 2048-bit numbers, the factors are so large that even the world's fastest computers would take millions of years.

This is why RSA works. Multiplication makes encryption possible. Factoring difficulty makes it secure.

WHY CLASSICAL ALGORITHMS CAN'T EFFICIENTLY FACTOR

Classical algorithms have to try many possible factors. Each attempt: Try a candidate factor, divide the number, check if it divides evenly, try the next candidate.

For a 2048-bit number, there are roughly 2 to the power of 1024 possible factors to try. Even at a million attempts per second, this takes billions of years.

The algorithm scales exponentially. Bigger numbers take exponentially longer.

WHAT MAKES SHOR'S ALGORITHM DIFFERENT

Shor's algorithm doesn't factor directly. Instead, it solves a different problem: Finding the Order of a Number.

In mathematics, the order is the smallest positive integer r such that: a to the power of r equals 1 modulo N.

Finding the order is hard classically. But here's the insight: If you know the order, you can factor the number.

WHERE QUANTUM COMPUTERS COME IN

Quantum computers can test many possible values of r simultaneously. Not one at a time. Many at once.

The quantum algorithm is designed so that wrong answers interfere with each other (amplitudes cancel out), while right answers interfere constructively (amplitudes add up).

Result: When you measure the quantum computer, you get the right answer with high probability.

THE CLASSICAL VS. QUANTUM TIMELINE

Factoring 2048-bit number on classical computer:
- Estimated time: 300 trillion years
- Algorithm: General Number Field Sieve
- Scaling: Exponential

Factoring 2048-bit number on quantum computer with Shor's:
- Estimated time: 1 hour
- Algorithm: Shor's Algorithm
- Scaling: Polynomial

That's not "faster." That's "the problem moves from unsolvable to solved."

WHY THIS DOESN'T APPLY TO LATTICE-BASED CRYPTOGRAPHY

This is the crucial part.

Lattice-based cryptography is based on different mathematical problems: Learning With Errors (LWE) and Shortest Vector Problem (SVP).

These problems don't have the same structure as factoring. There's no known quantum speedup for LWE or SVP.

Quantum computers might get a polynomial speedup (like 2x faster), but not the exponential-to-polynomial transformation that Shor's gives for factoring.

WHY THIS MATTERS FOR YOUR DATA

Shor's algorithm isn't hypothetical. It's been mathematically proven to work. When quantum computers large enough exist, RSA is broken.

Not weakened. Not at risk. Broken.

Every bit of RSA-encrypted data collected today becomes readable when quantum computers arrive.

This is why HNDL is credible. It's not "maybe quantum computers will break RSA." It's "when quantum computers reach certain qubits and error rates, Shor's breaks RSA, and recorded data becomes readable."

FOR YOUR ORGANIZATION

If you're implementing zero-trust, include in your design: ML-KEM for key exchange, ML-DSA for signatures, AES-256 for symmetric encryption.

If you already have zero-trust, upgrade pathway:
1. Audit current encryption (is it RSA-based?)
2. Pilot hybrid encryption on non-critical systems
3. Migrate medium-risk systems to hybrid
4. Plan full ML-KEM migration
5. Document timeline to leadership

The architecture you build today determines whether you survive the quantum era or just appear to.`,
    author: 'Dr. Elena Kozlov',
    date: '2026-04-22',
    category: 'educational',
    readTime: 10,
    image: '⚛️',
  },
  {
    id: '10',
    title: 'Zero Trust + Post-Quantum Cryptography: The Security Architecture That Survives Quantum Computers',
    excerpt: 'Zero-trust networks don\'t trust anyone by default. Post-quantum cryptography defends against future threats. Together, they\'re the future of security.',
    content: `I was in a security architecture meeting where someone asked: "If we go zero-trust, do we still need post-quantum cryptography?"

The answer is no. They're not overlapping concerns. They work together.

ZERO TRUST (SIMPLIFIED)

Zero-trust networks operate on one principle: Never trust, always verify.

Traditional Perimeter Security: There's a firewall at the edge. Inside the network: relatively trusted. Outside: untrusted. Problem: One breach inside the perimeter breaks everything.

Zero Trust: Every access request is verified independently. No implicit trust based on location. Every connection is encrypted and authenticated. Every user and device is validated continuously.

The assumption: Your encryption is unbreakable.

POST-QUANTUM CRYPTOGRAPHY (THE MISSING PIECE)

Zero-trust assumes your encryption is unbreakable. But here's the issue:

If you implement zero-trust with RSA-based encryption, you're verifying every access and authenticating every user. But your encryption uses RSA, which is vulnerable to quantum computers.

So: Quantum computer arrives. All encrypted traffic can be decrypted. Perfect verification means nothing if an attacker can read everything.

Post-quantum cryptography closes this gap.

THE ARCHITECTURE

User and Device Request
Step 1: Verify identity (MFA) with PQC
Step 2: Verify device health with PQC
Step 3: Verify authorization with PQC
Step 4: Encrypt communication with ML-KEM key exchange and AES-256-GCM encryption

Every step uses post-quantum cryptography.

WHAT THIS DEFENDS AGAINST

Scenario 1: Man-in-the-Middle Attack

Current zero-trust with RSA:
- Attacker intercepts traffic, records encrypted data
- "I'll decrypt this later when quantum computers exist"
- Zero-trust verification happens today (Success)
- But data confidentiality fails in future (Failure)

Zero-trust plus PQC:
- Attacker intercepts traffic, records encrypted data
- "I'll decrypt this later..."
- "I can't. ML-KEM is quantum-resistant."
- Success plus Success

Scenario 2: HNDL Attack (Harvest Now, Decrypt Later)

Attacker with zero-trust and RSA:
- "They have perfect authentication and verification"
- "But they're using RSA encryption"
- "I'll record their encrypted traffic"
- "When quantum computers arrive, I decrypt everything"

Attacker with zero-trust and PQC:
- "They have perfect authentication AND quantum-resistant encryption"
- "Even recording traffic is useless"
- "Their zero-trust catches my access attempts"
- "Their encryption can't be broken by quantum computers"

IMPLEMENTATION PATTERN

Step 1: TLS Upgrade
Replace TLS 1.3 with RSA-based key exchange with hybrid RSA plus ML-KEM key exchange.

Step 2: Authentication Upgrade
Replace ECDSA certificates with ML-DSA certificates or hybrid.

Step 3: Key Exchange Upgrade
Replace RSA key encapsulation with ML-KEM key encapsulation.

Step 4: Symmetric Encryption (Already Quantum-Resistant)
Good news: Your AES-256-GCM is already quantum-resistant. Only asymmetric crypto needs updating.

THE TIMELINE

Immediate (2025-2026):
- Deploy hybrid encryption (RSA plus ML-KEM)
- Update TLS to support PQC
- Rotate certificates to hybrid

Medium-term (2027-2028):
- Make ML-KEM primary, RSA secondary
- Migrate all new systems to PQC-first

Long-term (2029+):
- Deprecate RSA entirely
- All infrastructure is post-quantum

CRITICAL DETAIL

Zero-trust plus post-quantum isn't "defense in depth" if implemented wrong.

Wrong: Use zero-trust for access control (good), RSA for encryption (bad), hope quantum computers don't arrive.

Right: Use zero-trust for access control (good), ML-KEM for encryption (good), survive quantum computers (better).

Zero-trust handles access. Post-quantum handles confidentiality. Together, they handle every threat vector.

FOR YOUR ORGANIZATION

If you're implementing zero-trust, include: ML-KEM for key exchange, ML-DSA for signatures, AES-256 for symmetric encryption.

If you already have zero-trust, upgrade pathway:
1. Audit current encryption
2. Pilot hybrid encryption on non-critical systems
3. Migrate medium-risk systems to hybrid
4. Plan full ML-KEM migration
5. Document timeline to leadership

In 10 years, the organizations that combined zero-trust with post-quantum cryptography will be secure. Organizations that implemented zero-trust with RSA will explain why quantum computers decrypted their historical data.

Choose wisely.`,
    author: 'Christopher Moore',
    date: '2026-04-20',
    category: 'educational',
    readTime: 9,
    image: '🔐',
  },
];

export function Blog() {
  const [activeCategory, setActiveCategory] = React.useState<string>('all');

  const categories = [
    { id: 'threat', label: '⚠️ Threat Updates', color: 'text-red-400' },
    { id: 'case-study', label: '💼 Case Studies', color: 'text-blue-400' },
    { id: 'tips', label: '💡 Tips & Tricks', color: 'text-yellow-400' },
    { id: 'educational', label: '📚 Educational', color: 'text-green-400' },
  ];

  const featuredPost = blogPosts.find((post) => post.featured);
  const filteredPosts =
    activeCategory === 'all'
      ? blogPosts.filter((post) => !post.featured)
      : blogPosts.filter((post) => post.category === activeCategory && !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Quantum Security Blog</h1>
          <p className="text-slate-400">Insights on post-quantum cryptography, threat intelligence, and compliance</p>
        </div>

        {featuredPost && (
          <div className="mb-12">
            <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-transparent overflow-hidden hover:border-cyan-500/50 transition-colors">
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-3xl">{featuredPost.image}</span>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-sm rounded-full">Featured</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">{featuredPost.title}</h2>
                <p className="text-slate-300 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                  <div className="flex items-center gap-1">
                    <User size={16} className="text-cyan-400" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} className="text-cyan-400" />
                    {new Date(featuredPost.date).toLocaleDateString()}
                  </div>
                  <div>{featuredPost.readTime} min read</div>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg transition-colors">
                  Read Article
                  <ArrowRight size={16} />
                </button>
              </div>
            </Card>
          </div>
        )}

        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeCategory === 'all'
                  ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-700'
              }`}
            >
              All Articles
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:scale-105 flex flex-col overflow-hidden"
            >
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{post.image}</span>
                  <span className="px-2 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-full">
                    {categories.find((c) => c.id === post.category)?.label.split(' ')[0]}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-3">{post.title}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>

                <div className="flex-1" />

                <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-700">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div>{post.readTime} min</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No articles found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
