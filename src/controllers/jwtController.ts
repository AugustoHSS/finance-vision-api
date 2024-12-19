import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as jwtService from '../services/jwtService';


export async function refresh_access_token(req: Request, res: Response) {
    const refreshToken = req.cookies?.jwt;

    if (!refreshToken) {
        throw { message: 'password incorrect', type: 'validation error' };
    }
    const accessToken = await jwtService.refresh_access_token(refreshToken);

    res.status(200).send({ accessToken });
}