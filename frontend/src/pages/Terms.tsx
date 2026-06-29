import React from 'react';
import { ScrollReveal } from '../components/ui/ScrollReveal';

export function Terms() {
  return (
    <div className="min-h-screen bg-slate-950 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
          <div className="prose prose-invert max-w-none text-slate-300 space-y-6">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">1. Agreement to Terms</h2>
              <p>By accessing or using Novocrypt's services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">2. Intellectual Property</h2>
              <p>The Service and its original content, features and functionality are and will remain the exclusive property of Novocrypt and its licensors. The Service is protected by copyright, trademark, and other laws.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">3. User Accounts</h2>
              <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">4. Post-Quantum Cryptography Disclaimer</h2>
              <p>Our educational and analysis tools are provided for informational purposes only. While we strive to provide accurate information regarding cryptographic vulnerabilities and migration paths, the field of quantum computing and post-quantum cryptography is rapidly evolving. We do not guarantee the absolute security of any cryptographic implementation recommended or analyzed by our platform.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">5. Limitation of Liability</h2>
              <p>In no event shall Novocrypt, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">6. Changes to Terms</h2>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
            </section>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
