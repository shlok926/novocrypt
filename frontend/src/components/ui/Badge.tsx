import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'low' | 'medium' | 'high' | 'critical';
  className?: string;
}

const variantStyles = {
  default: 'bg-slate-100 text-slate-300',
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-orange-100 text-orange-700',
  critical: 'bg-red-100 text-red-700',
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', className = '' }, ref) => {
    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center px-3 py-1 rounded-full
          text-xs font-semibold
          ${variantStyles[variant]}
          ${className}
        `}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
