import { create } from 'zustand';
import { LabSession, RSAKeyPair } from '../types/lab.types';

interface LabStoreState {
  currentSession: LabSession | null;
  rsaKeyPair: RSAKeyPair | null;
  sessions: LabSession[];
  setCurrentSession: (session: LabSession) => void;
  setRSAKeyPair: (keyPair: RSAKeyPair) => void;
  addSession: (session: LabSession) => void;
  setSessions: (sessions: LabSession[]) => void;
  clearCurrent: () => void;
}

export const useLabStore = create<LabStoreState>((set) => ({
  currentSession: null,
  rsaKeyPair: null,
  sessions: [],
  setCurrentSession: (session) =>
    set({
      currentSession: session,
    }),
  setRSAKeyPair: (keyPair) =>
    set({
      rsaKeyPair: keyPair,
    }),
  addSession: (session) =>
    set((state) => ({
      sessions: [session, ...state.sessions],
    })),
  setSessions: (sessions) =>
    set({
      sessions,
    }),
  clearCurrent: () =>
    set({
      currentSession: null,
      rsaKeyPair: null,
    }),
}));
