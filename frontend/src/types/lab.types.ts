export interface LabSession {
  id: string;
  userId: string;
  pValue: number;
  qValue: number;
  eValue: number;
  nValue: number;
  phiN: number;
  privateKeyD: number;
  keySizeBits: number;
  classicalTimeMs: number;
  quantumSteps: number;
  quantumTimeMs: number;
  createdAt: string;
}

export interface RSAKeyPair {
  publicKey: { e: number; n: number };
  privateKey: { d: number; n: number };
  phi: number;
  p: number;
  q: number;
}

export interface LabPayload {
  p: number;
  q: number;
  e: number;
}

export interface LabResponse {
  session: LabSession;
  rsa: RSAKeyPair;
  classicalResult: { factors: number[]; timeMs: number };
  quantumResult: { steps: number; timeMs: number };
}
