import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function validateAccessToken(req: Request | any, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as jwt.JwtPayload;

        req.userId = userId;

        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Access token expired or invalid' });
    }
}

