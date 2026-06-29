// QuantumBot Chatbot Service - AI-like responses for quantum cryptography Q&A

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  startedAt: string;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  // Algorithm questions
  'what is ml-kem': 'ML-KEM (Module-Lattice-Based Key Encapsulation Mechanism) is a post-quantum cryptographic algorithm standardized by NIST (FIPS 203). It provides secure key establishment and is resistant to quantum computer attacks. It uses lattice-based mathematics and is faster than traditional key encapsulation methods.',
  'what is ml-dsa': 'ML-DSA (Module-Lattice-Based Digital Signature Algorithm) is NIST\'s post-quantum signature standard (FIPS 204). It replaces RSA and ECDSA signatures and provides quantum resistance. ML-DSA is deterministic and supports practical key sizes.',
  'what is slh-dsa': 'SLH-DSA (Stateless Hash-Based Digital Signature Algorithm) is a hash-based signature scheme standardized as FIPS 205. It offers excellent long-term security and is stateless, making it suitable for long-term key protection and archival signing.',
  'rsa quantum threat': 'RSA encryption can be broken by large quantum computers using Shor\'s algorithm. This threat is significant enough that organizations should begin transitioning to post-quantum cryptography now. The migration timeline is typically 5-10 years.',
  'ecdsa quantum threat': 'ECDSA (Elliptic Curve Digital Signature Algorithm) is also vulnerable to quantum computers. However, ECDSA keys provide a shorter security lifetime than RSA of the same bit length. Quantum-resistant alternatives like ML-DSA should be planned.',
  'hybrid cryptography': 'Hybrid cryptography combines classical and post-quantum algorithms. During transition, you can use both RSA and ML-KEM together, or ECDSA with ML-DSA. This provides security even if either algorithm is broken.',
  
  // Migration questions
  'how to migrate rsa to ml-kem': 'To migrate from RSA to ML-KEM: 1) Identify all RSA usage in your codebase 2) Integrate a post-quantum library (liboqs, OpenSSL 3.0+) 3) Test hybrid approaches first 4) Gradually roll out in non-critical systems 5) Monitor and refine before full deployment.',
  'migration timeline': 'A typical quantum-safe migration takes 18-36 months depending on organization size. Start with assessment (1-3 months), then library integration (2-3 months), followed by phased code migration (6-12 months), testing (3-4 months), and deployment (3-6 months).',
  'hybrid approach': 'A hybrid approach uses both classical and post-quantum algorithms simultaneously. For example, send both RSA and ML-KEM ciphertexts, requiring both to be broken to compromise security. This is recommended during transition periods.',
  'backwards compatibility': 'Hybrid cryptography maintains backwards compatibility. Old systems can continue using classical algorithms while new systems use post-quantum. Use hybrid mode for communication between old and new systems.',
  
  // Compliance questions
  'nist standards': 'NIST has finalized three post-quantum cryptography standards: FIPS 203 (ML-KEM for encryption), FIPS 204 (ML-DSA for signatures), and FIPS 205 (SLH-DSA for long-term signatures). These are now required for federal systems.',
  'compliance requirements': 'Organizations should: 1) Audit current cryptographic use 2) Identify quantum-vulnerable algorithms 3) Develop migration roadmaps 4) Test post-quantum implementations 5) Plan deployment timelines. Government agencies must comply by 2030-2035.',
  'fips 203': 'FIPS 203 standardizes ML-KEM (Module-Lattice-Based Key Encapsulation Mechanism). It provides 128, 192, and 256-bit security levels and is the recommended replacement for RSA key encapsulation.',
  'fips 204': 'FIPS 204 standardizes ML-DSA (Module-Lattice-Based Digital Signature Algorithm) with three security levels. It replaces RSA and ECDSA for digital signatures.',
  'fips 205': 'FIPS 205 standardizes SLH-DSA (Stateless Hash-Based Digital Signature Algorithm). Unlike ML-DSA which maintains state, SLH-DSA is stateless and suitable for long-term key material protection.',
  
  // Practical questions
  'key size ml-kem': 'ML-KEM key sizes: ML-KEM-512 (128-bit security), ML-KEM-768 (192-bit security), ML-KEM-1024 (256-bit security). For most applications, ML-KEM-768 is recommended as a balance between security and performance.',
  'performance impact': 'Post-quantum algorithms have varying performance: ML-KEM is fast (similar to RSA), ML-DSA is fast for verification but slower for signing, SLH-DSA is slower. Ciphertext sizes are larger (1-4KB). Testing in your environment is essential.',
  'certificate requirements': 'Post-quantum certificates will need to be issued and installed. Plan for certificate generation, storage, and rotation. Hybrid certificates containing both classical and post-quantum public keys are recommended.',
  'crypto agility': 'Crypto agility is the ability to quickly switch between cryptographic algorithms. It\'s crucial for post-quantum readiness. Implement: modular crypto libraries, algorithm configuration files, regular key rotation mechanisms.',
  
  // General questions
  'what is quantum computing threat': 'Large quantum computers (with millions of logical qubits) can break current encryption in hours. Today\'s quantum computers aren\'t this powerful, but progress is rapid. Organizations should migrate now to prepare.',
  'harvest now decrypt later': 'Adversaries may collect encrypted data today and decrypt it later when quantum computers are available. This makes migration urgent for long-term sensitive data. Organizations should retroactively protect stored data.',
  'post-quantum cryptography': 'Post-quantum cryptography uses mathematical problems believed to be hard for both classical and quantum computers. Main approaches: lattice-based (ML-KEM, ML-DSA), hash-based (SLH-DSA), multivariate, and code-based.',
  'quantum safe': 'A system is quantum-safe when it uses only quantum-resistant algorithms. This typically involves post-quantum cryptography for all critical operations.',
  'timeline to deploy': 'NIST recommends organizations begin post-quantum transitions now, with full deployment targets of 2030-2035 for critical systems. Early migration provides time for testing and refinement.'
};

function findBestMatch(query: string): { answer: string; confidence: number; } {
  const lowerQuery = query.toLowerCase().trim();
  
  // Direct match
  for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
    if (lowerQuery.includes(key) || key.includes(lowerQuery)) {
      return { answer: value, confidence: 0.95 };
    }
  }
  
  // Partial match
  let bestMatch = { answer: '', confidence: 0 };
  for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
    const keywords = key.split(' ');
    const matchCount = keywords.filter(kw => lowerQuery.includes(kw)).length;
    const confidence = matchCount / keywords.length;
    
    if (confidence > bestMatch.confidence) {
      bestMatch = { answer: value, confidence };
    }
  }
  
  return bestMatch.confidence > 0.4 
    ? bestMatch 
    : { 
        answer: 'I can help with questions about quantum cryptography, post-quantum algorithms (ML-KEM, ML-DSA, SLH-DSA), migration strategies, and compliance standards. What would you like to know?',
        confidence: 0
      };
}

export const chatbotService = {
  async chat(message: string): Promise<string> {
    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const { answer, confidence } = findBestMatch(message);
    
    // Add helpful follow-up suggestions based on topic
    let response = answer;
    
    if (message.toLowerCase().includes('migration')) {
      response += '\n\n💡 Consider creating a migration roadmap tailored to your organization size and industry using our Migration Planner tool.';
    }
    
    if (message.toLowerCase().includes('algorithm') && message.toLowerCase().includes('scan')) {
      response += '\n\n💡 Use our Scanner tool to identify cryptographic weaknesses in your codebase and get specific recommendations.';
    }
    
    if (message.toLowerCase().includes('compliance')) {
      response += '\n\n💡 Run a Compliance Checker against NIST, FIPS, and ISO standards to assess your current status.';
    }
    
    if (message.toLowerCase().includes('learn') || message.toLowerCase().includes('understand')) {
      response += '\n\n💡 Visit our Learning Center for comprehensive guides on post-quantum cryptography.';
    }
    
    return response;
  },

  async getChatSuggestions(): Promise<string[]> {
    return [
      'What is ML-KEM and why should I care?',
      'How do I migrate from RSA to post-quantum?',
      'What are the NIST standards for quantum-safe crypto?',
      'Is my current encryption vulnerable to quantum attacks?',
      'What\'s the timeline for quantum-safe migration?',
      'What is hybrid cryptography?',
      'How does harvest now, decrypt later work?',
      'What are the performance implications of PQC?'
    ];
  }
};
