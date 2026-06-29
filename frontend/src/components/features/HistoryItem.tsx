import React from 'react';
import { Card } from '../ui/Card';
import { FileText, Trash2 } from 'lucide-react';

interface HistoryItemProps {
  id: string;
  title: string;
  date: string;
  riskScore?: number;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({
  id,
  title,
  date,
  riskScore,
  riskLevel,
  onDelete,
  onClick,
}) => {
  const levelColors = {
    low: 'text-emerald-600 bg-emerald-50',
    medium: 'text-amber-600 bg-amber-50',
    high: 'text-orange-600 bg-orange-50',
    critical: 'text-red-600 bg-red-50',
  };

  return (
    <Card 
      variant="default" 
      className="flex items-center justify-between gap-4 cursor-pointer transition-all hover:shadow-lg"
      onClick={() => onClick?.(id)}
    >
      <div className="flex items-start gap-3">
        <FileText className="h-5 w-5 text-slate-400 mt-1" />
        <div>
          <h4 className="font-medium text-white">{title}</h4>
          <p className="text-sm text-slate-600">{date}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {riskScore !== undefined && riskLevel && (
          <div className={`rounded-lg px-3 py-1 text-sm font-semibold ${levelColors[riskLevel]}`}>
            {riskScore}
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(id);
          }}
          className="rounded-lg p-2 hover:bg-red-50"
          title="Delete"
        >
          <Trash2 className="h-4 w-4 text-red-600" />
        </button>
      </div>
    </Card>
  );
};
