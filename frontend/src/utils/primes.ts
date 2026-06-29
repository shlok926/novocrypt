// Simple prime checking for demo purposes
export const isPrime = (n: number): boolean => {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
};

// Find next prime
export const nextPrime = (n: number): number => {
  let candidate = n;
  while (!isPrime(candidate)) {
    candidate++;
  }
  return candidate;
};

// Generate random prime in range
export const generateRandomPrime = (min: number, max: number): number => {
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return nextPrime(randomNum);
};

// Get small primes for 8-bit and 16-bit RSA
export const getSmallPrimes = (bits: number): number[] => {
  const max = bits === 8 ? 256 : 65536;
  const primes: number[] = [];
  for (let i = 2; i < max; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
    if (primes.length >= 100) break;
  }
  return primes;
};
