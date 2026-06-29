import { useEffect, useState } from 'react';
import { BarChart3, LineChart, PieChart } from 'lucide-react';
import { threatService } from '@/services/threatMigrationService';
import { Card } from '@/components/ui';

interface ThreatStats {
  totalThreats: number;
  bySeverity: Record<string, number>;
  byCategory: Record<string, number>;
  trendsData?: Array<{ date: string; count: number }>;
}

export default function ThreatAnalytics() {
  const [stats, setStats] = useState<ThreatStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      const data = await threatService.getThreatStatistics();
      setStats(data);
      setLoading(false);
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500" />
      </div>
    );
  }

  if (!stats) {
    return <div className="text-center text-gray-400 py-12">Failed to load analytics</div>;
  }

  return (
    <div className="space-y-8">
      {/* Severity Distribution */}
      <Card className="border-slate-700/50 p-6">
        <div className="flex items-center gap-3 mb-6">
          <PieChart className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Threat Severity Distribution</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
            <div className="text-red-300 text-sm font-medium">Critical</div>
            <div className="text-3xl font-bold text-red-400 mt-2">{stats.bySeverity.critical || 0}</div>
            <div className="text-gray-400 text-xs mt-1">{Math.round((stats.bySeverity.critical / stats.totalThreats) * 100)}%</div>
          </div>
          <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-4">
            <div className="text-orange-300 text-sm font-medium">High</div>
            <div className="text-3xl font-bold text-orange-400 mt-2">{stats.bySeverity.high || 0}</div>
            <div className="text-gray-400 text-xs mt-1">{Math.round((stats.bySeverity.high / stats.totalThreats) * 100)}%</div>
          </div>
          <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
            <div className="text-yellow-300 text-sm font-medium">Medium</div>
            <div className="text-3xl font-bold text-yellow-400 mt-2">{stats.bySeverity.medium || 0}</div>
            <div className="text-gray-400 text-xs mt-1">{Math.round((stats.bySeverity.medium / stats.totalThreats) * 100)}%</div>
          </div>
          <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
            <div className="text-blue-300 text-sm font-medium">Low</div>
            <div className="text-3xl font-bold text-blue-400 mt-2">{stats.bySeverity.low || 0}</div>
            <div className="text-gray-400 text-xs mt-1">{Math.round((stats.bySeverity.low / stats.totalThreats) * 100)}%</div>
          </div>
        </div>
      </Card>

      {/* Category Breakdown */}
      <Card className="border-slate-700/50 p-6">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Threat Categories</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(stats.byCategory || {}).map(([category, count]) => (
            <div key={category} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-4">
              <div className="text-slate-300 text-sm font-medium capitalize">{category.replace('-', ' ')}</div>
              <div className="text-2xl font-bold text-cyan-400 mt-2">{count as number}</div>
              <div className="w-full bg-slate-700 rounded-full h-1 mt-3">
                <div
                  className="bg-cyan-500 h-1 rounded-full"
                  style={{ width: `${((count as number / stats.totalThreats) * 100).toFixed(0)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Risk Timeline (Mock Data) */}
      <Card className="border-slate-700/50 p-6">
        <div className="flex items-center gap-3 mb-6">
          <LineChart className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Threat Trend (30 Days)</h3>
        </div>
        <div className="space-y-3">
          {[
            { date: 'May 20', threats: 8, trend: '↑' },
            { date: 'May 19', threats: 7, trend: '↑' },
            { date: 'May 18', threats: 6, trend: '→' },
            { date: 'May 17', threats: 6, trend: '↓' },
            { date: 'May 16', threats: 7, trend: '↑' },
          ].map((item) => (
            <div key={item.date} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <span className="text-gray-300">{item.date}</span>
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {Array(item.threats)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="w-2 h-8 bg-red-500 rounded-sm" />
                    ))}
                </div>
                <span className="text-2xl text-cyan-400 w-6">{item.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
