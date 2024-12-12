import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export function validateSchema(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            throw { message: error.details[0].message, type: 'schema validate' };
        }
        next();
    };
}
