import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card } from '../ui/Card';

interface ThreatCardProps {
  name: string;
  description: string;
  severity: 'critical' | 'high' | 'medium';
  impact: string;
}

const ThreatCard: React.FC<ThreatCardProps> = ({ name, description, severity, impact }) => {
  const severityColors = {
    critical: 'border-red-500/50 bg-red-500/10',
    high: 'border-orange-500/50 bg-orange-500/10',
    medium: 'border-yellow-500/50 bg-yellow-500/10',
  };

  const severityBadgeColors = {
    critical: 'bg-red-500/20 text-red-400',
    high: 'bg-orange-500/20 text-orange-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
  };

  return (
    <div className={`rounded-lg border p-4 ${severityColors[severity]}`}>
      <div className="mb-2 flex items-start justify-between">
        <h4 className="font-semibold text-white">{name}</h4>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${severityBadgeColors[severity]}`}>
          {severity.toUpperCase()}
        </span>
      </div>
      <p className="mb-2 text-sm text-slate-300">{description}</p>
      <p className="text-xs text-slate-400">
        <strong>Impact:</strong> {impact}
      </p>
    </div>
  );
};

export const ThreatsSection: React.FC = () => {
  const threats = [
    {
      name: 'Harvest Now, Decrypt Later (HNDL)',
      description:
        'Adversaries are collecting encrypted data today to decrypt when quantum computers arrive.',
      severity: 'critical' as const,
      impact: 'All encrypted communication since 1990s',
    },
    {
      name: 'RSA Vulnerability',
      description: "RSA encryption (widely used in TLS, SSH) can be broken in polynomial time by Shor's algorithm.",
      severity: 'critical' as const,
      impact: 'All systems using RSA-2048 and below',
    },
    {
      name: 'ECC Vulnerability',
      description: 'Elliptic Curve Cryptography is also vulnerable to quantum attacks.',
      severity: 'high' as const,
      impact: 'Modern TLS certificates and blockchain systems',
    },
    {
      name: 'Legacy System Risk',
      description: 'Many legacy systems cannot quickly migrate to post-quantum algorithms.',
      severity: 'high' as const,
      impact: 'Enterprise infrastructure with 10+ year lifespan',
    },
  ];

  return (
    <section className="border-t border-slate-800 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <h2 className="text-3xl font-bold text-white">Quantum Threats</h2>
          </div>
          <p className="text-lg text-slate-400">
            Understanding the risks that quantum computing poses to your organization
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {threats.map((threat, idx) => (
            <ThreatCard key={idx} {...threat} />
          ))}
        </div>
      </div>
    </section>
  );
};
