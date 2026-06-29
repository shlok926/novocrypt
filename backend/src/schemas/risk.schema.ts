import { z } from 'zod';

export const calculateRiskSchema = z.object({
  body: z.object({
    industry: z.string().min(2),
    dataType: z.string().min(2),
    encryption: z.string().min(2),
    dataLifetime: z.number().int().min(1).max(100),
  }),
});
