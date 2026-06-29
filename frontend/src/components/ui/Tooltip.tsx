import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const positionStyles = {
  top: 'bottom-full mb-2 left-1/2 -translate-x-1/2 origin-bottom',
  bottom: 'top-full mt-2 left-1/2 -translate-x-1/2 origin-top',
  left: 'right-full mr-2 top-1/2 -translate-y-1/2 origin-right',
  right: 'left-full ml-2 top-1/2 -translate-y-1/2 origin-left',
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (
        <div
          className={`
            absolute whitespace-nowrap
            px-3 py-2 rounded-md text-sm font-medium
            bg-slate-900 text-white shadow-lg
            animate-in fade-in zoom-in-95 duration-200
            pointer-events-none
            ${positionStyles[position]}
          `}
        >
          {content}
          <div
            className={`
              absolute w-2 h-2 bg-slate-900 transform rotate-45
              ${position === 'top' ? 'top-full -mt-1 left-1/2 -translate-x-1/2' : ''}
              ${position === 'bottom' ? 'bottom-full mt-1 left-1/2 -translate-x-1/2' : ''}
              ${position === 'left' ? 'left-full -ml-1 top-1/2 -translate-y-1/2' : ''}
              ${position === 'right' ? 'right-full ml-1 top-1/2 -translate-y-1/2' : ''}
            `}
          />
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';
