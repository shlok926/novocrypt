// RSA Implementation for 8-bit and 16-bit demo
export interface RSAKeys {
  publicKey: { e: number; n: number };
  privateKey: { d: number; n: number };
  p: number;
  q: number;
  phi: number;
}

// Extended Euclidean Algorithm
const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

const extendedGcd = (a: number, b: number): [number, number, number] => {
  if (b === 0) return [a, 1, 0];
  const [g, x1, y1] = extendedGcd(b, a % b);
  const x = y1;
  const y = x1 - Math.floor(a / b) * y1;
  return [g, x, y];
};

// Modular inverse
export const modInverse = (a: number, m: number): number => {
  const [g, x] = extendedGcd(a, m);
  if (g !== 1) throw new Error('Modular inverse does not exist');
  return (x % m + m) % m;
};

// Generate RSA key pair
export const generateRSAKeyPair = (p: number, q: number, e: number): RSAKeys => {
  // Verify primes
  const isPrime = (num: number) => {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return false; 
    }
    return num > 1;
  }
  if (!isPrime(p)) throw new Error('P must be a prime number');
  if (!isPrime(q)) throw new Error('Q must be a prime number');
  if (p === q) throw new Error('P and Q must be distinct distinct prime numbers');

  const n = p * q;
  const phi = (p - 1) * (q - 1);

  // Verify e is valid
  if (gcd(e, phi) !== 1) {
    throw new Error('e and phi must be coprime');
  }

  // Calculate d (private exponent)
  const d = modInverse(e, phi);

  return {
    publicKey: { e, n },
    privateKey: { d, n },
    p,
    q,
    phi,
  };
};

// Encrypt/Decrypt (for demo, work with small numbers)
export const rsa_encrypt = (plaintext: number, publicKey: { e: number; n: number }): number => {
  return Math.pow(plaintext, publicKey.e) % publicKey.n;
};

export const rsa_decrypt = (ciphertext: number, privateKey: { d: number; n: number }): number => {
  return Math.pow(ciphertext, privateKey.d) % privateKey.n;
};

// Trial division factorization (classical attack on small numbers)
export const classicalFactorization = (n: number): { factors: number[]; time: number } => {
  const startTime = performance.now();
  const factors: number[] = [];

  let divisor = 2;
  let quotient = n;

  while (divisor * divisor <= quotient) {
    if (quotient % divisor === 0) {
      factors.push(divisor);
      quotient /= divisor;
    } else {
      divisor++;
    }
  }

  if (quotient > 1) {
    factors.push(quotient);
  }

  const endTime = performance.now();
  return { factors, time: endTime - startTime };
};
