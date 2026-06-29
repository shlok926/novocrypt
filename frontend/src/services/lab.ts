import { api as axiosInstance } from '../lib/api';
import { LabPayload, LabResponse, LabSession } from '../types/lab.types';

export const labService = {
  generateKeys: async (payload: LabPayload): Promise<LabResponse> => {
    const { data } = await axiosInstance.post('/lab/generate-keys', payload);
    return data;
  },

  classicalAttack: async (nValue: number) => {
    const { data } = await axiosInstance.post('/lab/classical-attack', { n: nValue });
    return data;
  },

  quantumAttack: async (nValue: number) => {
    const { data } = await axiosInstance.post('/lab/quantum-attack', { n: nValue });
    return data;
  },

  compare: async (nValue: number) => {
    const { data } = await axiosInstance.post('/lab/compare', { n: nValue });
    return data;
  },

  getSessions: async (): Promise<LabSession[]> => {
    const { data } = await axiosInstance.get('/lab/history');
    return data;
  },

  getSession: async (id: string): Promise<LabSession> => {
    const { data } = await axiosInstance.get(`/lab/${id}`);
    return data;
  },
};
