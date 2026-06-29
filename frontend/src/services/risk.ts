import { api as axiosInstance } from '../lib/api';
import { RiskCalculatorPayload, RiskCalculatorResponse, RiskAssessment } from '../types/risk.types';

export const riskService = {
  calculate: async (payload: RiskCalculatorPayload): Promise<RiskCalculatorResponse> => {
    const { data } = await axiosInstance.post('/risk/calculate', payload);
    return data;
  },

  getAssessments: async (): Promise<RiskAssessment[]> => {
    const { data } = await axiosInstance.get('/risk/history');
    return data;
  },

  getAssessment: async (id: string): Promise<RiskAssessment> => {
    const { data } = await axiosInstance.get(`/risk/${id}`);
    return data;
  },

  generateReport: async (assessmentId: string) => {
    const { data } = await axiosInstance.post('/reports/generate', { assessmentId });
    return data;
  },

  getReports: async () => {
    const { data } = await axiosInstance.get('/reports/list');
    return data;
  },
};
