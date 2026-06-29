import { create } from 'zustand';
import { RiskAssessment } from '../types/risk.types';

interface RiskStoreState {
  currentAssessment: RiskAssessment | null;
  assessments: RiskAssessment[];
  setCurrentAssessment: (assessment: RiskAssessment) => void;
  addAssessment: (assessment: RiskAssessment) => void;
  setAssessments: (assessments: RiskAssessment[]) => void;
  clearCurrent: () => void;
}

export const useRiskStore = create<RiskStoreState>((set) => ({
  currentAssessment: null,
  assessments: [],
  setCurrentAssessment: (assessment) =>
    set({
      currentAssessment: assessment,
    }),
  addAssessment: (assessment) =>
    set((state) => ({
      assessments: [assessment, ...state.assessments],
    })),
  setAssessments: (assessments) =>
    set({
      assessments,
    }),
  clearCurrent: () =>
    set({
      currentAssessment: null,
    }),
}));
