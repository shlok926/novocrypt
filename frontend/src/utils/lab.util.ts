import { calculateRiskScore, getRiskLevel, getRecommendations } from './riskCalculator';
import { formatNumber, formatTime } from './formatters';

export interface RiskReport {
  score: number;
  level: string;
  yearsUntilRisk: number;
  recommendations: string[];
  summary: string;
}

export const generateRiskReport = (
  industry: string,
  dataType: string,
  encryption: string,
  dataLifetime: number
): RiskReport => {
  const score = calculateRiskScore(industry, dataType, encryption, dataLifetime);
  const level = getRiskLevel(score);
  const recommendations = getRecommendations(level, encryption);

  // Calculate Q-Day timeline (estimated 2035 for cryptographically relevant quantum computer)
  const qdayYear = 2035;
  const currentYear = new Date().getFullYear();
  const yearsUntilQday = qdayYear - currentYear;
  const yearsUntilRisk = Math.min(dataLifetime, yearsUntilQday);

  const summaryMap: Record<string, string> = {
    Low: 'Your data has low quantum risk. Continue monitoring developments.',
    Medium: 'Your data has moderate quantum risk. Plan post-quantum migration.',
    High: 'Your data has high quantum risk. Urgent action needed within 12 months.',
    Critical: 'Your data has critical quantum risk. Immediate emergency response required.',
  };

  return {
    score,
    level,
    yearsUntilRisk,
    recommendations,
    summary: summaryMap[level] || '',
  };
};

export const exportRiskReportAsJSON = (report: RiskReport): string => {
  return JSON.stringify(report, null, 2);
};

export const generateRiskReportHTML = (report: RiskReport): string => {
  return `
    <html>
      <head>
        <title>Novocrypt - Risk Assessment Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .header { color: #3B82F6; margin-bottom: 20px; }
          .score { font-size: 48px; font-weight: bold; color: #EF4444; }
          .level { font-size: 24px; color: #F59E0B; }
          .recommendations { margin-top: 20px; }
          .recommendation-item { margin: 10px 0; padding: 10px; background: #F3F4F6; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Quantum Risk Assessment Report</h1>
          <p>Generated: ${new Date().toLocaleDateString()}</p>
        </div>
        <div>
          <p class="score">Risk Score: ${report.score}/100</p>
          <p class="level">Risk Level: ${report.level}</p>
          <p>Years Until Risk: ${report.yearsUntilRisk}</p>
          <p>${report.summary}</p>
        </div>
        <div class="recommendations">
          <h2>Recommendations</h2>
          ${report.recommendations.map((rec) => `<div class="recommendation-item">• ${rec}</div>`).join('')}
        </div>
      </body>
    </html>
  `;
};
