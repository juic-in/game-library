import { Request, Response } from 'express';
import { authLogin, authLogout, authRegister } from './auth';
import { createToken, maxAge } from '../../utils/authUtil';
import { AuthenticatedRequest } from '../../middleware/authMiddleware';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const result = await authRegister(name, email, password);
    const token = createToken(result._id.toString());
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ success: true, data: result._id });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authLogin(email, password);
    const token = createToken(result._id.toString());
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ success: true, data: result._id });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const verifyUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    res.status(200).json({ success: true, data: req.user });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    await authLogout(req, res);
    return res
      .status(200)
      .json({ success: true, data: 'Logged out successfully' });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};
