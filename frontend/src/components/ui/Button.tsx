import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantStyles = {
  primary: 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] disabled:bg-cyan-900 disabled:text-cyan-700 disabled:shadow-none',
  secondary: 'bg-transparent border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 disabled:border-slate-800 disabled:text-slate-600',
  ghost: 'bg-transparent text-slate-400 hover:text-cyan-400 hover:bg-slate-900',
  danger: 'bg-red-500/10 border border-red-500/50 text-red-400 hover:bg-red-500/20 disabled:border-slate-800 disabled:text-slate-600',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm rounded',
  md: 'px-4 py-2 text-base rounded-lg',
  lg: 'px-6 py-3 text-lg rounded-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, children, className = '', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          font-semibold transition-colors duration-200
          flex items-center justify-center gap-2
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${disabled || isLoading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
          ${className}
        `}
        {...props}
      >
        {isLoading && (
          <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
