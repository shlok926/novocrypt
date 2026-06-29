import { api as axiosInstance } from '../lib/api';

export const contentService = {
  getQdayStats: async () => {
    const { data } = await axiosInstance.get('/content/qday-stats');
    return data;
  },

  getThreats: async () => {
    const { data } = await axiosInstance.get('/content/threats');
    return data;
  },

  getArticles: async () => {
    const { data } = await axiosInstance.get('/content/articles');
    return data;
  },
};
