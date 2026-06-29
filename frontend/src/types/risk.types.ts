export interface RiskAssessment {
  id: string;
  userId: string;
  industry: string;
  dataType: string;
  encryption: string;
  dataLifetime: number;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  recommendations: string[];
  createdAt: string;
}

export interface RiskCalculatorPayload {
  industry: string;
  dataType: string;
  encryption: string;
  dataLifetime: number;
}

export interface RiskCalculatorResponse {
  assessment: RiskAssessment;
  yearsUntilRisk: number;
  recommendations: string[];
}

export interface Report {
  id: string;
  userId: string;
  assessmentId: string;
  fileUrl: string;
  createdAt: string;
}
