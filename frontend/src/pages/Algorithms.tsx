import React from 'react';
import { Card, Tabs, Badge } from '../components/ui';
import { ALGORITHMS_DATA, NIST_STANDARDS } from '../constants/algorithms';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const Algorithms: React.FC = () => {
  const algorithmTabs = [
    {
      label: 'All Algorithms',
      value: 'all',
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-3 text-left">Algorithm</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Key Size</th>
                <th className="px-4 py-3 text-left">Quantum Safe</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {ALGORITHMS_DATA.map((algo, idx) => (
                <tr key={idx} className="border-b border-slate-800 hover:bg-transparent">
                  <td className="px-4 py-3 font-medium text-white">{algo.name}</td>
                  <td className="px-4 py-3 text-slate-600">{algo.category}</td>
                  <td className="px-4 py-3 text-slate-600">{algo.keySize} bits</td>
                  <td className="px-4 py-3">
                    <Badge variant={algo.quantumSafe ? 'success' : 'high'}>
                      {algo.quantumSafe ? 'Safe' : 'Vulnerable'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{algo.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      label: 'NIST Standards',
      value: 'nist',
      content: (
        <div className="space-y-4">
          {NIST_STANDARDS.map((standard, idx) => (
            <Card key={idx} variant="default">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white mb-1">{standard.algorithm}</h3>
                  <p className="text-sm text-slate-600 mb-2">{standard.description}</p>
                  <div className="flex gap-2">
                    <Badge variant="success">{standard.type}</Badge>
                    <Badge variant="default">{standard.year}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ),
    },
    {
      label: 'Comparison & Complexity Chart',
      value: 'comparison',
      content: (
        <div className="space-y-8">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-slate-900 border-slate-700">
              <h3 className="font-bold text-white mb-4">RSA-2048</h3>
              <ul className="text-sm space-y-2 text-slate-400">
                <li>• Time Complexity: O(log³ n)</li>
                <li>• Key Size: 2048 bits</li>
                <li>• Status: <span className="text-red-400">Vulnerable</span> (Shor's)</li>
                <li>• Post-Quantum Safe?: No</li>
              </ul>
            </Card>
            <Card className="bg-slate-900 border-slate-700">
              <h3 className="font-bold text-white mb-4">ECC-256</h3>
              <ul className="text-sm space-y-2 text-slate-400">
                <li>• Time Complexity: O(log n)</li>
                <li>• Key Size: 256 bits</li>
                <li>• Status: <span className="text-red-400">Vulnerable</span> (Shor's)</li>
                <li>• Post-Quantum Safe?: No</li>
              </ul>
            </Card>
            <Card className="bg-slate-900 border-cyan-500/30">
              <h3 className="font-bold text-cyan-400 mb-4">Kyber (ML-KEM)</h3>
              <ul className="text-sm space-y-2 text-slate-400">
                <li>• Type: Lattice-based</li>
                <li>• NIST Status: Approved (FIPS 203)</li>
                <li>• Status: <span className="text-cyan-400">Secure</span></li>
                <li>• Post-Quantum Safe?: Yes ✓</li>
              </ul>
            </Card>
          </div>
          
          <Card className="bg-slate-900 border-slate-700">
            <h3 className="font-bold text-white mb-6">Attack Complexity (Classical vs Quantum)</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { bits: 128, classical: 10, quantum: 2 },
                    { bits: 256, classical: 20, quantum: 4 },
                    { bits: 512, classical: 40, quantum: 8 },
                    { bits: 1024, classical: 80, quantum: 16 },
                    { bits: 2048, classical: 160, quantum: 32 }
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="bits" stroke="#94a3b8" label={{ value: 'Key Size (Bits)', position: 'insideBottomRight', offset: 0, fill: '#94a3b8' }} />
                  <YAxis stroke="#94a3b8" label={{ value: 'Operations (Log scale ~)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                  <Legend />
                  <Line type="monotone" dataKey="classical" name="Classical Attack (NFS)" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="quantum" name="Quantum Attack (Shor's)" stroke="#22d3ee" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-slate-400 mt-4 text-center">
              Notice how Quantum operational complexity (Cyan) scales linearly instead of exponentially when cracking factorization problems.
            </p>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-transparent py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Algorithm Comparison</h1>

        <Card>
          <Tabs tabs={algorithmTabs} />
        </Card>
      </div>
    </div>
  );
};
