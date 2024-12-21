import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/userRepository';
import * as jwtRepository from '../repositories/refreshTokenRepository';

export async function refreshAccessToken(refreshToken: string) {
    try {
        const decodedToken: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);

        const user = await userRepository.findById(decodedToken.userId);

        const storedToken = await jwtRepository.findByToken(refreshToken, decodedToken.userId);

        if (!storedToken || storedToken.expiresAt < new Date()) {
            throw { message: 'expired refresh token', type: 'validation error' };
        }

        if (!user) {
            throw { message: 'Unauthorized', type: 'validation error' };
        }

        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '15m' });
        return accessToken;
    } catch (error) {
        console.log(error)
        throw { message: 'password incorrect', type: 'validation error' };
    }
}

export async function revokeRefreshToken(refreshToken: string) {

    const result = await jwtRepository.deleteByToken(refreshToken);

    if (result.count === 0) {
        throw { message: 'Refresh token not found', type: 'not_found' };
    }

}

export async function checkEmailExistence(email: string) {
    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
        throw { message: 'Email already in use', type: 'duplicate value' };
    }
}

export async function hashAndCreateUser(username: string, email: string, password: string) {
    const passwordHash = bcrypt.hashSync(password, 10);
    userRepository.createUser(username, email, passwordHash);
}

export async function login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw { message: 'email not found', type: 'validation error' };
    }
    validatePassword(password, user.password);

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: "7d" });

    await jwtRepository.saveRefreshToken(user.id, refreshToken)

    return {
        accessToken,
        refreshToken,
    };
}

function validatePassword(plainPassword: string, hashedPassword: string) {
    const validation = bcrypt.compareSync(plainPassword, hashedPassword);
    if (!validation) {
        throw { message: 'password incorrect', type: 'validation error' };
    }
}