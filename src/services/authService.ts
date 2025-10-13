import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/userRepository';
import * as refreshTokenRepository from '../repositories/refreshTokenRepository';

import { AppError } from '../errors/AppError';
import { ErrorType } from '../errors/ErrorTypes';


export async function refreshAccessToken(refreshToken: string) {
    try {
        const decodedToken: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string); // eslint-disable-line

        const user = await userRepository.findById(decodedToken.userId);

        const storedRefreshToken = await refreshTokenRepository.findByToken(refreshToken, decodedToken.userId);

        if (!storedRefreshToken || storedRefreshToken.expiresAt < new Date()) {
            throw new AppError('Refresh token expired', ErrorType.VALIDATION_ERROR);
        }

        if (!user) {
            throw new AppError('User not found or unauthorized', ErrorType.VALIDATION_ERROR);;
        }

        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '15m' });
        return accessToken;
    } catch (error) {
        console.log(error);
        throw new AppError('Incorrect password', ErrorType.VALIDATION_ERROR);
    }
}

export async function revokeRefreshToken(refreshToken: string) {

    const result = await refreshTokenRepository.deleteByToken(refreshToken);

    if (result.count === 0) {
        throw new AppError('Refresh token not found', ErrorType.NOT_FOUND);
    }
}

export async function checkEmailExistence(email: string) {
    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
        throw new AppError('Email already in use', ErrorType.DUPLICATE_VALUE);
    }
}

export async function hashAndCreateUser(username: string, email: string, password: string) {
    const passwordHash = bcrypt.hashSync(password, 10);
    userRepository.createUser(username, email, passwordHash);
}

export async function login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new AppError('Email not registered', ErrorType.VALIDATION_ERROR);
    }
    validatePassword(password, user.password);

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET as string);
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '7d' });

    await refreshTokenRepository.saveRefreshToken(user.id, refreshToken);

    return { accessToken };
}

function validatePassword(plainPassword: string, hashedPassword: string) {
    const validation = bcrypt.compareSync(plainPassword, hashedPassword);
    if (!validation) {
        throw new AppError('Incorrect password', ErrorType.VALIDATION_ERROR);
    }
}
