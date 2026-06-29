import React from 'react';

interface WarningAlertProps {
  message: string;
  title?: string;
  onDismiss?: () => void;
}

export const WarningAlert: React.FC<WarningAlertProps> = ({ message, title, onDismiss }) => {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
      <div className="flex items-start justify-between">
        <div>
          {title && <h4 className="font-semibold">{title}</h4>}
          <p className={`text-sm ${title ? 'mt-1' : ''}`}>{message}</p>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="ml-2 opacity-60 hover:opacity-100">
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
