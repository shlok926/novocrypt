import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface ReportCardProps {
  id: string;
  title: string;
  date: string;
  fileUrl?: string;
  riskScore?: number;
  riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  onDownload?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({
  id,
  title,
  date,
  fileUrl,
  riskScore,
  riskLevel,
  onDownload,
  onDelete,
}) => {
  return (
    <Card variant="default" className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-white">{title}</h4>
          <p className="text-sm text-slate-600">{date}</p>
        </div>
        {riskLevel && <Badge variant={riskLevel}>{riskLevel}</Badge>}
      </div>

      {riskScore !== undefined && (
        <div className="rounded-lg bg-transparent p-3">
          <div className="text-xs text-slate-600">Risk Score</div>
          <div className="text-2xl font-bold text-white">{riskScore}</div>
        </div>
      )}

      <div className="flex gap-2">
        {fileUrl && (
          <button
            onClick={() => onDownload?.(id)}
            className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Download
          </button>
        )}
        <button
          onClick={() => onDelete?.(id)}
          className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </Card>
  );
};
