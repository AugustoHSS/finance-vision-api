import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { AppError } from '../errors/AppError';
import { ErrorType } from '../errors/ErrorTypes';

export function validateAccessToken(req: Request | any, res: Response, next: NextFunction) { // eslint-disable-line
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        throw new AppError('Access token is missing or invalid', ErrorType.VALIDATION_ERROR);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        throw new AppError('Access token is missing or invalid', ErrorType.VALIDATION_ERROR);
    }

    const { userId } = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as jwt.JwtPayload;

    if (!userId) {
        throw new AppError('Access token is invalid', ErrorType.VALIDATION_ERROR);
    }

    req.userId = userId;

    return next();


}

