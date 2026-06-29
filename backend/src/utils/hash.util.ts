import bcrypt from 'bcryptjs';
import { env } from '../config/env';

export const hashPassword = async (value: string): Promise<string> =>
  bcrypt.hash(value, env.BCRYPT_SALT_ROUNDS);

export const verifyPassword = async (value: string, hash: string): Promise<boolean> =>
  bcrypt.compare(value, hash);
