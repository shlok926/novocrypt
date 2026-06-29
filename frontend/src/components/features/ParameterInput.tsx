import React from 'react';
import { Card } from '../ui/Card';

interface ParameterInputProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  min?: number;
  max?: number;
  step?: number;
  type?: 'text' | 'number';
  helper?: string;
  disabled?: boolean;
}

export const ParameterInput: React.FC<ParameterInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  type = 'number',
  helper,
  disabled = false,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(type === 'number' ? parseInt(e.target.value) : e.target.value)}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-100"
      />
      {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
    </div>
  );
};
