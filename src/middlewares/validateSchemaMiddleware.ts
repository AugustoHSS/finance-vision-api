import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { AppError } from '../errors/AppError';
import { ErrorType } from '../errors/ErrorTypes';

export function validateSchema(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            throw new AppError(error?.details[0].message, ErrorType.SCHEMA_VALIDATE);
        }
        next();
    };
}
