import React from 'react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Zap } from 'lucide-react';

interface AttackComparisonProps {
  classicalTime?: string;
  quantumTime?: string;
  n?: number;
  classicalSteps?: number;
  quantumSteps?: number;
}

export const AttackComparison: React.FC<AttackComparisonProps> = ({
  classicalTime,
  quantumTime,
  n,
  classicalSteps,
  quantumSteps,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-white">Attack Comparison</h3>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <Card variant="default">
          <div className="space-y-3">
            <h4 className="font-medium text-white">Classical Attack</h4>
            <div className="space-y-2">
              <div>
                <span className="text-xs font-medium text-slate-600">Time:</span>
                <div className="text-lg font-bold text-white">{classicalTime || 'N/A'}</div>
              </div>
              {classicalSteps && (
                <div>
                  <span className="text-xs font-medium text-slate-600">Steps:</span>
                  <div className="text-sm text-slate-300">{classicalSteps.toLocaleString()}</div>
                </div>
              )}
            </div>
            <Badge variant="low">Feasible with current computers</Badge>
          </div>
        </Card>

        <Card variant="highlight">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-white">Quantum Attack</h4>
              <Zap className="h-4 w-4 text-purple-600" />
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-xs font-medium text-slate-600">Time:</span>
                <div className="text-lg font-bold text-purple-600">{quantumTime || 'N/A'}</div>
              </div>
              {quantumSteps && (
                <div>
                  <span className="text-xs font-medium text-slate-600">Steps:</span>
                  <div className="text-sm text-slate-300">{quantumSteps.toLocaleString()}</div>
                </div>
              )}
            </div>
            <Badge variant="critical">Exponentially faster</Badge>
          </div>
        </Card>
      </div>

      {n && (
        <div className="rounded-lg bg-blue-50 p-3 text-sm text-slate-300">
          <strong>N = {n.toLocaleString()}</strong> - With current computers, factorization would take {classicalTime}. 
          With quantum computers, Shor's algorithm reduces this to {quantumTime}.
        </div>
      )}
    </div>
  );
};
