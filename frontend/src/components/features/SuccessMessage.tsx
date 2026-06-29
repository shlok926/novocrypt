import React from 'react';

interface SuccessMessageProps {
  message: string;
  title?: string;
  onClose?: () => void;
  autoClose?: number;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  message,
  title,
  onClose,
  autoClose = 5000,
}) => {
  React.useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-900">
      <div className="flex items-start justify-between">
        <div>
          {title && <h4 className="font-semibold">{title}</h4>}
          <p className={`text-sm ${title ? 'mt-1' : ''}`}>{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
