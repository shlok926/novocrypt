import { AppError } from '../middleware/error.middleware';

const MAX_INT32 = 2_147_483_647;

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

const modInverse = (a: number, mod: number): number => {
  let oldR = mod;
  let r = a;
  let oldS = 0;
  let s = 1;
  while (r !== 0) {
    const q = Math.floor(oldR / r);
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
  }
  if (oldR !== 1) {
    throw new AppError('Cannot derive private key for this modulus (math failure)', 400);
  }
  return ((oldS % mod) + mod) % mod;
};

const pickPublicExponent = (phi: number): number => {
  for (const candidate of [65_537, 17, 5, 3]) {
    if (candidate < phi && gcd(candidate, phi) === 1) {
      return candidate;
    }
  }
  throw new AppError('No suitable public exponent for this key (try different primes)', 400);
};

export type LabDerived = {
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
};

export const deriveLabSession = (
  pValue: number,
  qValue: number,
  classicalEffortFactor: number,
): LabDerived => {
  if (!Number.isInteger(pValue) || !Number.isInteger(qValue) || pValue < 3 || qValue < 3) {
    throw new AppError('p and q must be integers ≥ 3', 400);
  }
  if (pValue === qValue) {
    throw new AppError('p and q must be different', 400);
  }
  const nValue = pValue * qValue;
  if (nValue > MAX_INT32) {
    throw new AppError('Modulus too large for this demo (must fit 32-bit storage)', 400);
  }

  const phiN = (pValue - 1) * (qValue - 1);
  const eValue = pickPublicExponent(phiN);
  const privateKeyD = modInverse(eValue, phiN);
  const keySizeBits = Math.max(1, Math.floor(Math.log2(nValue)) + 1);

  const classicalUnits = Math.max(1, Math.round(Math.sqrt(nValue) * classicalEffortFactor));
  const quantumSteps = Math.max(1, Math.round(Math.log2(nValue) * 8));
  const speedup = Math.max(1, Math.round(classicalUnits / quantumSteps));
  const quantumProxyMs = Math.max(1, Math.round(classicalUnits / speedup));

  return {
    pValue,
    qValue,
    eValue,
    nValue,
    phiN,
    privateKeyD,
    keySizeBits,
    classicalTimeMs: classicalUnits,
    quantumSteps,
    quantumTimeMs: quantumProxyMs,
  };
};
