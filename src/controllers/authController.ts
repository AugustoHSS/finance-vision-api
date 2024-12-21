import { Request, Response } from 'express';
import * as jwtService from '../services/authService';


export async function refreshAccessToken(req: Request, res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    console.log(req.cookies.refresh_token)
    if (!refreshToken) {
        throw { message: 'No content', type: 'validation error' };
    }
    const accessToken = await jwtService.refreshAccessToken(refreshToken);

    res.status(200).send({ accessToken });
}

export async function logout(req: Request, res: Response) {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
        throw { message: 'No content', type: 'validation error' };
    }

    jwtService.revokeRefreshToken(refreshToken)

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

    const { accessToken, refreshToken } = await authService.login(email, password);
    authService
    res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).send({ accessToken });
}