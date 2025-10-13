import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { AppError } from '../errors/AppError';
import { ErrorType } from '../errors/ErrorTypes';

export async function refreshAccessToken(req: Request, res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
        throw new AppError('Refresh token not found', ErrorType.NOT_FOUND);
    }
    const accessToken = await authService.refreshAccessToken(refreshToken);

    res.status(200).send({ accessToken });
}

export async function logout(req: Request, res: Response) {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
        throw new AppError('Refresh token not found', ErrorType.NOT_FOUND);
    }

    authService.revokeRefreshToken(refreshToken);

    res.clearCookie('refresh_token', { httpOnly: true, sameSite: 'none' });

    return res.status(204).json({ message: 'Logged out successfully' });
}

export async function registerUser(req: Request, res: Response) {
    const { username, email, password } = req.body;

    await authService.checkEmailExistence(email);
    await authService.hashAndCreateUser(username, email, password);
    res.sendStatus(201);
}

export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const { accessToken } = await authService.login(email, password);
    
    res.status(200).send({ accessToken });
}
