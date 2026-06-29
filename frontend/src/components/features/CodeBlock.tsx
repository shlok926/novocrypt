import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript', title }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 overflow-hidden">
      {title && (
        <div className="border-b border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300">
          {title}
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm text-slate-100">
          <code>{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute right-4 top-4 rounded-lg bg-slate-700 px-3 py-1 text-xs font-medium text-slate-100 hover:bg-slate-600"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
};
