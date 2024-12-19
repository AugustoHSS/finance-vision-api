import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../repositories/userRepository';

export async function refresh_access_token(refresh_token: string) {
    try {
        const decoded: any = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET as string);

        const user = await userRepository.findById(decoded.userId);

        if (!user) {
            throw { message: 'Unauthorized', type: 'validation error' };
        }

        const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '15m' });
        return { accessToken };
    } catch (error) {
        throw { message: 'password incorrect', type: 'validation error' };
    }
}