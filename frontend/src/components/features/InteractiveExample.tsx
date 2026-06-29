import React from 'react';
import { Card } from '../ui/Card';

interface InteractiveExampleProps {
  title: string;
  description: string;
  input?: string;
  output?: string;
  onRun?: () => void;
  running?: boolean;
}

export const InteractiveExample: React.FC<InteractiveExampleProps> = ({
  title,
  description,
  input,
  output,
  onRun,
  running = false,
}) => {
  return (
    <Card variant="default" className="space-y-4">
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>

      <div className="space-y-2">
        {input && (
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Input</label>
            <div className="rounded-lg bg-slate-100 p-3 font-mono text-sm text-slate-300 overflow-x-auto">
              {input}
            </div>
          </div>
        )}

        {output && (
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Output</label>
            <div className="rounded-lg bg-green-50 p-3 font-mono text-sm text-green-700 border border-green-200 overflow-x-auto">
              {output}
            </div>
          </div>
        )}
      </div>

      {onRun && (
        <button
          onClick={onRun}
          disabled={running}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {running ? 'Running...' : 'Run Example'}
        </button>
      )}
    </Card>
  );
};
