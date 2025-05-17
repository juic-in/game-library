import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
} from '../controllers/user/auth.controller';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/verify', verifyUser);

router.post('/logout', logoutUser);

export default router;
