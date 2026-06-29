import React from 'react';

interface ConceptBoxProps {
  title: string;
  content: string;
  highlight?: boolean;
}

export const ConceptBox: React.FC<ConceptBoxProps> = ({ title, content, highlight = false }) => {
  return (
    <div className={`rounded-lg border p-4 ${highlight ? 'border-blue-300 bg-blue-50' : 'border-slate-800 bg-transparent'}`}>
      <h4 className={`font-semibold ${highlight ? 'text-blue-900' : 'text-white'}`}>
        {title}
      </h4>
      <p className={`mt-2 text-sm ${highlight ? 'text-blue-800' : 'text-slate-300'}`}>
        {content}
      </p>
    </div>
  );
};
