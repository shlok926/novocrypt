import { z } from 'zod';

const MAX_INT32 = 2_147_483_647;

export const createLabSessionSchema = z.object({
  body: z
    .object({
      pValue: z.number().int().min(3),
      qValue: z.number().int().min(3),
      classicalEffortFactor: z.number().int().min(1).max(100_000),
    })
    .strict()
    .refine((body) => body.pValue !== body.qValue, { message: 'p and q must differ' })
    .refine((body) => body.pValue * body.qValue <= MAX_INT32, {
      message: 'p × q exceeds storage limit',
    }),
});
