import { Request, Response } from 'express';
import { AppError } from '../errors/AppError';

export const errorMiddleware = (
    error: any, // eslint-disable-line
    req: Request,
    res: Response,
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
