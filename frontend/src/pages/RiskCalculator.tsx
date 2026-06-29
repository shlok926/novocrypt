import React, { useState } from 'react';
import { Card, Button, Input, Badge, Progress } from '../components/ui';
import { useRiskCalculator } from '../hooks/useRiskCalculator';
import { INDUSTRIES, DATA_TYPES, ENCRYPTION_TYPES, DATA_LIFETIME_OPTIONS } from '../constants/industries';
import { RISK_LEVELS } from '../constants/riskLevels';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const RiskCalculator: React.FC = () => {
  const [industry, setIndustry] = useState('tech');
  const [dataType, setDataType] = useState('personal');
  const [encryption, setEncryption] = useState('rsa-2048');
  const [dataLifetime, setDataLifetime] = useState(10);

  const { calculate, isLoading } = useRiskCalculator();
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const res = calculate({
      industry,
      dataType,
      encryption,
      dataLifetime,
    });
    if (res) {
      setResult(res);
    }
  };

  const getRiskColor = (level: string) => {
    const colors: Record<string, string> = {
      Low: 'emerald',
      Medium: 'amber',
      High: 'orange',
      Critical: 'red',
    };
    return colors[level] || 'slate';
  };

  return (
    <div className="min-h-screen bg-transparent py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Quantum Risk Calculator</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <h2 className="text-2xl font-bold text-white mb-6">Assess Your Risk</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                >
                  {INDUSTRIES.map((ind) => (
                    <option key={ind.value} value={ind.value}>
                      {ind.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Data Type
                </label>
                <select
                  value={dataType}
                  onChange={(e) => setDataType(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                >
                  {DATA_TYPES.map((dt) => (
                    <option key={dt.value} value={dt.value}>
                      {dt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Encryption Used
                </label>
                <select
                  value={encryption}
                  onChange={(e) => setEncryption(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                >
                  {ENCRYPTION_TYPES.map((enc) => (
                    <option key={enc.value} value={enc.value}>
                      {enc.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Data Lifetime
                </label>
                <select
                  value={dataLifetime}
                  onChange={(e) => setDataLifetime(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 text-slate-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                >
                  {DATA_LIFETIME_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <Button onClick={handleCalculate} isLoading={isLoading} className="w-full">
                Calculate Risk
              </Button>
            </div>
          </Card>

          {/* Results */}
          {result && (
            <Card variant="highlight">
              <h2 className="text-2xl font-bold text-white mb-6">Your Risk Assessment</h2>

              <div className="space-y-6">
                <div>
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="text-5xl font-bold text-white">{result.score}</span>
                    <span className="text-slate-400">/100</span>
                  </div>
                  <Progress value={result.score} max={100} />
                </div>

                <div>
                  <p className="text-sm text-slate-400 mb-2">Risk Level</p>
                  <Badge variant={result.level.toLowerCase() as any}>
                    {result.level}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-slate-400 mb-2">Years Until Risk</p>
                  <p className="text-2xl font-bold text-white">{result.yearsUntilRisk} years</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-white mb-3">Recommendations</p>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="text-sm text-slate-300">
                        • {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <Button 
                    onClick={() => {
                      const doc = new jsPDF();
                      const pageWidth = doc.internal.pageSize.width;
                      
                      // 1. Header (Dark Navy background)
                      doc.setFillColor(15, 23, 42); // slate-900
                      doc.rect(0, 0, pageWidth, 40, 'F');
                      
                      doc.setTextColor(255, 255, 255);
                      doc.setFontSize(24);
                      doc.setFont('helvetica', 'bold');
                      doc.text('Novocrypt', 20, 22);
                      
                      doc.setTextColor(34, 211, 238); // cyan-400
                      doc.setFontSize(14);
                      doc.setFont('helvetica', 'normal');
                      doc.text('QUANTUM RISK ASSESSMENT REPORT', 20, 32);

                      // Date & time in header (real-time)
                      doc.setTextColor(200, 200, 200);
                      doc.setFontSize(10);
                      const generatedAt = new Date().toLocaleString();
                      doc.text(`Generated: ${generatedAt}`, pageWidth - 20, 32, { align: 'right' });

                      // Lookup Helpers for Labels
                      const indLabel = INDUSTRIES.find(i => i.value === industry)?.label || industry;
                      const dataLabel = DATA_TYPES.find(i => i.value === dataType)?.label || dataType;
                      const encLabel = ENCRYPTION_TYPES.find(i => i.value === encryption)?.label || encryption;
                      
                      // 2. Input Summary Table
                      doc.setTextColor(51, 65, 85); // reset text color
                      autoTable(doc, {
                        startY: 50,
                        head: [['Assessment Parameter', 'Selected Value']],
                        body: [
                          ['Industry', indLabel],
                          ['Data Type', dataLabel],
                          ['Current Encryption', encLabel],
                          ['Data Lifetime', `${dataLifetime} Years`]
                        ],
                        theme: 'grid',
                        headStyles: { fillColor: [30, 41, 59], textColor: [255, 255, 255] }, // slate-800
                        styles: { fontSize: 11, cellPadding: 6 },
                        columnStyles: { 0: { cellWidth: 80, fontStyle: 'bold' } }
                      });

                      // 3. Risk Results section
                      const finalY = (doc as any).lastAutoTable.finalY + 15;
                      
                      doc.setFontSize(16);
                      doc.setTextColor(15, 23, 42);
                      doc.setFont('helvetica', 'bold');
                      doc.text('Risk Analysis Breakdown', 20, finalY);
                      
                      const resultY = finalY + 10;
                      
                      // Score Box
                      doc.setFillColor(241, 245, 249); // slate-100
                      doc.rect(20, resultY, 50, 25, 'F');
                      doc.setFontSize(12);
                      doc.setTextColor(100, 116, 139);
                      doc.text('Risk Score', 45, resultY + 8, { align: 'center' });
                      doc.setTextColor(15, 23, 42);
                      doc.setFontSize(22);
                      doc.text(`${result.score}/100`, 45, resultY + 18, { align: 'center' });

                      // Level Box
                      let levelColor = [15, 23, 42]; // default dark
                      if(result.level === 'Critical') levelColor = [239, 68, 68]; // red-500
                      if(result.level === 'High') levelColor = [249, 115, 22]; // orange-500
                      if(result.level === 'Medium') levelColor = [234, 179, 8]; // yellow-500
                      if(result.level === 'Low') levelColor = [16, 185, 129]; // emerald-500

                      doc.setFillColor(levelColor[0], levelColor[1], levelColor[2]);
                      doc.rect(80, resultY, 50, 25, 'F');
                      doc.setFontSize(12);
                      doc.setTextColor(255, 255, 255);
                      doc.text('Risk Level', 105, resultY + 8, { align: 'center' });
                      doc.setFontSize(20);
                      doc.text(result.level.toUpperCase(), 105, resultY + 18, { align: 'center' });
                      
                      // Years Box
                      doc.setFillColor(34, 211, 238); // cyan-400
                      doc.rect(140, resultY, 50, 25, 'F');
                      doc.setFontSize(12);
                      doc.setTextColor(15, 23, 42);
                      doc.text('Years Until Risk', 165, resultY + 8, { align: 'center' });
                      doc.setFontSize(22);
                      doc.text(`${result.yearsUntilRisk}`, 165, resultY + 18, { align: 'center' });

                      // 4. Recommendations
                      const recY = resultY + 45;
                      doc.setFontSize(16);
                      doc.setTextColor(15, 23, 42);
                      doc.setFont('helvetica', 'bold');
                      doc.text('Actionable Recommendations', 20, recY);

                      const recsData = result.recommendations.map((rec: string) => [rec]);
                      
                      autoTable(doc, {
                        startY: recY + 6,
                        body: recsData,
                        theme: 'plain',
                        styles: { fontSize: 11, textColor: [51, 65, 85], cellPadding: 4 },
                        columnStyles: { 0: { cellWidth: 170 } },
                        didParseCell: function(data) {
                          if (data.section === 'body') {
                            data.cell.text = data.cell.text.map(t => '• ' + t);
                          }
                        }
                      });

                      // Footer
                      const pageHeight = doc.internal.pageSize.height;
                      doc.setFontSize(10);
                      doc.setTextColor(150, 150, 150);
                      doc.text('Generated by Novocrypt Algorithm Lab', pageWidth / 2, pageHeight - 10, { align: 'center' });
                      
                      doc.save('Quantum-Risk-Report.pdf');
                    }}
                    variant="primary"
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
                  >
                    Download PDF Report
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
