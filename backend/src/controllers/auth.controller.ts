import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { signAccessToken } from '../utils/jwt.util';

const sanitizeUser = (user: { id: string; email: string; name: string | null; role: string }) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role,
});

export const authController = {
  async register(req: Request, res: Response): Promise<void> {
    const user = await authService.register(req.body);
    const token = signAccessToken({ userId: user.id, email: user.email, role: user.role });
    res.status(201).json({
      success: true,
      data: { user: sanitizeUser(user), token },
    });
  },

  async login(req: Request, res: Response): Promise<void> {
    const user = await authService.login(req.body);
    const token = signAccessToken({ userId: user.id, email: user.email, role: user.role });
    res.json({
      success: true,
      data: { user: sanitizeUser(user), token },
    });
  },

  async logout(_req: Request, res: Response): Promise<void> {
    res.json({ success: true, data: { loggedOut: true } });
  },

  async me(req: Request, res: Response): Promise<void> {
    res.json({ success: true, data: { user: req.user } });
  },
};
