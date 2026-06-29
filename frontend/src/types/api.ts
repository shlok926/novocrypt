export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  error: {
    message: string;
    details?: unknown;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type User = {
  id: string;
  email: string;
  name: string | null;
  role: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

export type RiskInput = {
  industry: string;
  dataType: string;
  encryption: string;
  dataLifetime: number;
};

export type RiskResult = {
  riskScore: number;
  riskLevel: string;
  yearsUntilRisk: number;
  recommendations: string[];
  assessmentId: string;
};

export type RiskAssessment = {
  id: string;
  userId: string;
  industry: string;
  dataType: string;
  encryption: string;
  dataLifetime: number;
  riskScore: number;
  riskLevel: string;
  recommendations: string[];
  createdAt: string;
};

export type LabCreateInput = {
  pValue: number;
  qValue: number;
  classicalEffortFactor: number;
};

export type LabSession = {
  id: string;
  userId: string;
  pValue: number;
  qValue: number;
  eValue: number;
  nValue: number;
  phiN: number;
  privateKeyD: number;
  keySizeBits: number;
  classicalTimeMs: string;
  quantumSteps: number;
  quantumTimeMs: string;
  createdAt: string;
};
