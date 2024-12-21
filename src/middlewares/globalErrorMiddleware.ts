import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export const errorMiddleware = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
            type: error.type,
        });
    }

    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
};