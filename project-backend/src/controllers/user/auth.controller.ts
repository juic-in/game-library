import { Request, Response } from 'express';
import { authLogin, authLogout, authRegister, authVerify, JwtPayloadUser } from './auth';
import { createToken, maxAge } from '../../utils/authUtil';
import { AuthenticatedRequest } from '../../middleware/authMiddleware';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const jwtPayload = await authRegister(username, email, password);
    const token = createToken(jwtPayload);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ success: true, data: jwtPayload.userId });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const jwtPayload = await authLogin(email, password);
    const token = createToken(jwtPayload);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: process.env.NODE_ENV === 'production',
    });
    res.status(200).json({ success: true, data: jwtPayload.userId });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const verifyUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const response = await authVerify(req) as JwtPayloadUser;
    res.status(200).json({
      success: true,
      data: response,
    });
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
