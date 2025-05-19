import express, { Response } from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
} from '../controllers/user/auth.controller';
import { AuthenticatedRequest, requireAdminAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/verify', verifyUser);

router.get('/verify-admin', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({ success: true, data: 'Admin verified' });
});

router.post('/logout', logoutUser);

export default router;
