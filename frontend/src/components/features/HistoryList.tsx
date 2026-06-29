import React from 'react';
import { Card } from '../ui/Card';

interface HistoryListProps {
  items: Array<{
    id: string;
    title: string;
    date: string;
    riskScore?: number;
    riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  }>;
  onItemClick?: (id: string) => void;
  onItemDelete?: (id: string) => void;
  empty?: boolean;
  emptyMessage?: string;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  items,
  onItemClick,
  onItemDelete,
  empty = false,
  emptyMessage = 'No items in history',
}) => {
  if (empty || items.length === 0) {
    return (
      <Card variant="default" className="text-center py-8">
        <p className="text-slate-600">{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card 
          key={item.id} 
          variant="default" 
          className="flex items-center justify-between cursor-pointer hover:shadow-lg"
          onClick={() => onItemClick?.(item.id)}
        >
          <div>
            <h4 className="font-medium text-white">{item.title}</h4>
            <p className="text-sm text-slate-600">{item.date}</p>
          </div>
          {item.riskScore !== undefined && (
            <span className="font-bold text-white">{item.riskScore}</span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onItemDelete?.(item.id);
            }}
            className="ml-4 text-red-600 hover:text-red-700"
            title="Delete"
          >
            ✕
          </button>
        </Card>
      ))}
    </div>
  );
};
