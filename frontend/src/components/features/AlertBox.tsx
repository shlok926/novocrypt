import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

type AlertType = 'error' | 'success' | 'info' | 'warning';

interface AlertBoxProps {
  type: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
}

export const AlertBox: React.FC<AlertBoxProps> = ({ type, title, message, onClose }) => {
  const styles = {
    error: 'bg-red-50 border-red-200 text-red-900',
    success: 'bg-green-50 border-green-200 text-green-900',
    info: 'bg-blue-50 border-blue-200 text-blue-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
  };

  const icons = {
    error: <AlertCircle className="h-5 w-5" />,
    success: <CheckCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
  };

  return (
    <div className={`rounded-lg border p-4 ${styles[type]}`}>
      <div className="flex items-start gap-3">
        {icons[type]}
        <div className="flex-1">
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
