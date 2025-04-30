import express from 'express';
import { requireUserAuth } from '../middleware/authMiddleware';

const router = express.Router();
router.use(requireUserAuth)

// router.put('/:gameId', addToUserLib);
// 
export default router;
