import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

export const CTASection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-t border-slate-800 bg-slate-900/80 py-16 text-white">
      {/* Neon glowing effect in the background */}
      <div className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="h-[200px] w-[600px] rounded-full bg-cyan-500/10 blur-[100px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-3xl font-bold text-white">Ready to Assess Your Risk?</h2>
        <p className="mb-8 text-lg text-slate-300">
          Take our quantum risk calculator to understand your organization's vulnerability or test post-quantum algorithms in our interactive lab.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/risk">
            <Button 
              size="lg"
              className="bg-cyan-500 font-bold text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:bg-cyan-400"
            >
              Start Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/lab">
            <Button 
              size="lg"
              className="border border-cyan-500/50 bg-transparent text-cyan-400 hover:bg-cyan-500/10"
            >
              Explore Quantum Lab
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
