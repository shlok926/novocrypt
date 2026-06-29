import { useState, useEffect } from 'react';
import { Bell, Mail, Smartphone, Settings } from 'lucide-react';
import { Card } from '@/components/ui';

interface AlertSubscription {
  id: string;
  threatCategory: string;
  minSeverity: 'critical' | 'high' | 'medium' | 'low';
  channels: ('email' | 'browser' | 'sms')[];
  frequency: 'instant' | 'daily' | 'weekly';
  isActive: boolean;
}

export default function AlertSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<AlertSubscription[]>([
    {
      id: '1',
      threatCategory: 'quantum-progress',
      minSeverity: 'critical',
      channels: ['email', 'browser'],
      frequency: 'instant',
      isActive: true,
    },
    {
      id: '2',
      threatCategory: 'vulnerability',
      minSeverity: 'high',
      channels: ['email'],
      frequency: 'daily',
      isActive: true,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const toggleSubscription = (id: string) => {
    setSubscriptions(
      subscriptions.map((sub) => (sub.id === id ? { ...sub, isActive: !sub.isActive } : sub))
    );
  };

  const deleteSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <Card className="border-slate-700/50 p-6 bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-cyan-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Alert Subscriptions</h3>
              <p className="text-sm text-gray-400">Stay informed about threats relevant to you</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg transition-colors"
          >
            + New Subscription
          </button>
        </div>
      </Card>

      {/* Create Form */}
      {showForm && (
        <Card className="border-cyan-500/20 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Create New Alert Subscription</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Category</label>
              <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm">
                <option>quantum-progress</option>
                <option>standards</option>
                <option>vulnerability</option>
                <option>attack</option>
                <option>regulation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Minimum Severity</label>
              <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm">
                <option>critical</option>
                <option>high</option>
                <option>medium</option>
                <option>low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Frequency</label>
              <select className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm">
                <option>instant</option>
                <option>daily</option>
                <option>weekly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Channels</label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input type="checkbox" defaultChecked className="rounded" />
                  Email
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input type="checkbox" defaultChecked className="rounded" />
                  Browser
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors">
              Create Subscription
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </Card>
      )}

      {/* Active Subscriptions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Your Subscriptions</h3>
        {subscriptions.length === 0 ? (
          <Card className="border-slate-700/50 p-6 text-center">
            <p className="text-gray-400">No active subscriptions. Create one to get started!</p>
          </Card>
        ) : (
          subscriptions.map((sub) => (
            <Card
              key={sub.id}
              className={`border-slate-700/50 p-6 transition-opacity ${!sub.isActive ? 'opacity-50' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-white capitalize">{sub.threatCategory.replace('-', ' ')}</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Severity: <span className="text-cyan-400 font-medium">{sub.minSeverity.toUpperCase()}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleSubscription(sub.id)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      sub.isActive
                        ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                        : 'bg-gray-700/20 text-gray-400 hover:bg-gray-700/30'
                    }`}
                  >
                    {sub.isActive ? '✓ Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => deleteSubscription(sub.id)}
                    className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-2">Alert Frequency</p>
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-gray-300 capitalize">{sub.frequency}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Notification Channels</p>
                  <div className="flex gap-3">
                    {sub.channels.includes('email') && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-slate-800/50 rounded">
                        <Mail className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs text-gray-300">Email</span>
                      </div>
                    )}
                    {sub.channels.includes('browser') && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-slate-800/50 rounded">
                        <Bell className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs text-gray-300">Browser</span>
                      </div>
                    )}
                    {sub.channels.includes('sms') && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-slate-800/50 rounded">
                        <Smartphone className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs text-gray-300">SMS</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-2">Created</p>
                  <p className="text-sm text-gray-300">May 20, 2026</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Notification Preferences */}
      <Card className="border-slate-700/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="w-6 h-6 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">Global Notification Settings</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
            <span className="text-gray-300">Email Notifications</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
            <span className="text-gray-300">Browser Push Notifications</span>
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
            <span className="text-gray-300">SMS Alerts (Premium)</span>
            <input type="checkbox" disabled className="w-4 h-4 rounded opacity-50" />
          </div>
        </div>
      </Card>
    </div>
  );
}
