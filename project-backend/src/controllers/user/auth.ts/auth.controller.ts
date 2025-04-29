import { Request, Response } from 'express';
import { authRegister } from './auth';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const result = await authRegister(name, email, password);
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }
};
