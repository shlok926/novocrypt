import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, breadcrumbs }) => {
  return (
    <div className="border-b border-slate-800 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {breadcrumbs && (
          <nav className="mb-4 flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-slate-400">/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="text-blue-600 hover:text-blue-700">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-slate-600">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        {subtitle && <p className="mt-2 text-lg text-slate-600">{subtitle}</p>}
      </div>
    </div>
  );
};
