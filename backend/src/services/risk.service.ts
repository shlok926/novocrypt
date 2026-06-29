import { prisma } from '../config/database';
import { calculateRisk, RiskInput } from '../utils/risk.util';

export const riskService = {
  async calculateAndSave(userId: string, payload: RiskInput) {
    const risk = calculateRisk(payload);

    const assessment = await prisma.riskAssessment.create({
      data: {
        userId,
        industry: payload.industry,
        dataType: payload.dataType,
        encryption: payload.encryption,
        dataLifetime: payload.dataLifetime,
        riskScore: risk.riskScore,
        riskLevel: risk.riskLevel,
        recommendations: risk.recommendations,
      },
    });

    return { ...risk, assessmentId: assessment.id };
  },

  async history(userId: string) {
    return prisma.riskAssessment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async getById(userId: string, id: string) {
    return prisma.riskAssessment.findFirst({
      where: { id, userId },
    });
  },
};
