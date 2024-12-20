import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository';
import * as jwtRepository from '../repositories/jwtRepository';

export async function refresh_access_token(refreshToken: string) {
    try {
        const decoded: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);

        const user = await userRepository.findById(decoded.userId);

        const storedToken = await jwtRepository.findByToken(refreshToken, decoded.userId);

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

export async function deleteRefreshToken(refreshToken: string) {

    const result = await jwtRepository.deleteByToken(refreshToken);

    if (result.count === 0) {
        throw { message: 'Refresh token not found', type: 'not_found' };
    }

}