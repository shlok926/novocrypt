import React from 'react';
import { Lock, Microscope, TrendingUp } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="rounded-xl border border-slate-800 bg-slate-900 border-slate-800 p-6 shadow-sm transition-all hover:shadow-lg">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/50">
      {icon}
    </div>
    <h3 className="mb-2 font-semibold text-white">{title}</h3>
    <p className="text-sm text-slate-400">{description}</p>
  </div>
);

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: <Lock className="h-6 w-6 text-cyan-400" />,
      title: 'Risk Calculator',
      description: 'Assess your quantum vulnerability with industry-specific scoring.',
    },
    {
      icon: <Microscope className="h-6 w-6 text-cyan-400" />,
      title: 'Algorithm Lab',
      description: 'Simulate RSA attacks and compare classical vs quantum effort.',
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-cyan-400" />,
      title: 'Migration Guide',
      description: 'Get actionable recommendations for post-quantum migration.',
    },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Core Features</h2>
          <p className="text-lg text-slate-400">Everything you need to understand and prepare for quantum threats</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
