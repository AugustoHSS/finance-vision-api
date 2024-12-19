import { Request, Response } from 'express';
import * as jwtService from '../services/jwtService';


export async function refresh_access_token(req: Request, res: Response) {
    const refreshToken = req.cookies?.jwt;

    if (!refreshToken) {
        throw { message: 'No content', type: 'validation error' };
    }
    const accessToken = await jwtService.refresh_access_token(refreshToken);

    res.status(200).send({ accessToken });
}

export async function logout(req: Request, res: Response) {
    const refreshToken = req.cookies?.jwt;

    if (!refreshToken) {
        throw { message: 'No content', type: 'validation error' };
    }

    jwtService.deleteRefreshToken(refreshToken)

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none' });
    return res.status(204).json({ message: 'Logged out successfully' });
}