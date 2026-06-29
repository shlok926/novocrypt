import { api as axiosInstance } from '../lib/api';
import { Algorithm, AlgorithmComparison } from '../types/algorithm.types';

export const algorithmService = {
  getAlgorithms: async (): Promise<Algorithm[]> => {
    const { data } = await axiosInstance.get('/algorithms/list');
    return data;
  },

  getComparison: async (): Promise<AlgorithmComparison[]> => {
    const { data } = await axiosInstance.get('/algorithms/compare');
    return data;
  },

  getNISTStandards: async () => {
    const { data } = await axiosInstance.get('/algorithms/nist');
    return data;
  },
};
