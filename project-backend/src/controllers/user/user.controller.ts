import { Request, Response } from 'express';


export const addToUserLib = async (req: Request, res: Response) => {
  try {
    // await userAddGame
  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, error: error.message })
  }
}