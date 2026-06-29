import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/50 px-4 py-2">
            <Zap className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">Quantum Threat Awareness</span>
          </div>
          
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Defend Against Quantum Threats
          </h1>
          
          <p className="mx-auto mb-8 max-w-2xl text-xl text-slate-300">
            Understand the quantum computing threat to your encryption. Assess your quantum risk and plan your migration to post-quantum cryptography before Q-Day arrives in 2035.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/risk">
              <Button variant="primary" size="lg">
                Start Risk Assessment
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/learn">
              <Button variant="secondary" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-blue-200 opacity-10 blur-3xl" />
        <div className="absolute -bottom-32 left-0 -z-10 h-96 w-96 rounded-full bg-purple-200 opacity-10 blur-3xl" />
      </div>
    </section>
  );
};
