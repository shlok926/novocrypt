import React from 'react';
import { Card } from '../ui/Card';
import { Copy, Check } from 'lucide-react';

interface KeyInfoPanelProps {
  publicKey?: string;
  privateKey?: string;
  modulus?: string;
  phi?: string;
}

export const KeyInfoPanel: React.FC<KeyInfoPanelProps> = ({ 
  publicKey, 
  privateKey, 
  modulus, 
  phi 
}) => {
  const [copied, setCopied] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const KeyDisplay = ({ label, value }: { label: string; value?: string }) => {
    if (!value) return null;
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">{label}</label>
        <div className="flex items-center gap-2">
          <code className="flex-1 break-all rounded bg-slate-100 p-2 text-xs font-mono text-slate-300">
            {value}
          </code>
          <button
            onClick={() => copyToClipboard(value, label)}
            className="rounded-lg p-2 hover:bg-slate-100"
            title="Copy to clipboard"
          >
            {copied === label ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <Card variant="default" className="space-y-4">
      <h3 className="font-semibold text-white">Generated Keys</h3>
      
      <div className="space-y-4">
        {modulus && <KeyDisplay label="Modulus (N)" value={modulus} />}
        {phi && <KeyDisplay label="Phi (φ)" value={phi} />}
        {publicKey && <KeyDisplay label="Public Key (e, n)" value={publicKey} />}
        {privateKey && <KeyDisplay label="Private Key (d, n)" value={privateKey} />}
      </div>

      {!publicKey && (
        <div className="rounded-lg bg-transparent p-3 text-center text-sm text-slate-600">
          Generate keys to see values here
        </div>
      )}
    </Card>
  );
};
