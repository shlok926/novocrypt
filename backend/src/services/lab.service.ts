import { prisma } from '../config/database';
import { deriveLabSession } from '../utils/lab.util';

export const labService = {
  async create(
    userId: string,
    input: { pValue: number; qValue: number; classicalEffortFactor: number },
  ) {
    const derived = deriveLabSession(input.pValue, input.qValue, input.classicalEffortFactor);

    return prisma.labSession.create({
      data: {
        userId,
        pValue: derived.pValue,
        qValue: derived.qValue,
        eValue: derived.eValue,
        nValue: derived.nValue,
        phiN: derived.phiN,
        privateKeyD: derived.privateKeyD,
        keySizeBits: derived.keySizeBits,
        classicalTimeMs: Number(derived.classicalTimeMs.toFixed(2)),
        quantumSteps: derived.quantumSteps,
        quantumTimeMs: Number(derived.quantumTimeMs.toFixed(2)),
      },
    });
  },

  async history(userId: string) {
    return prisma.labSession.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async getById(userId: string, id: string) {
    return prisma.labSession.findFirst({
      where: { id, userId },
    });
  },
};
