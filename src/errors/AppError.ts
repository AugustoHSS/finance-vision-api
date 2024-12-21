import { ErrorType } from './ErrorTypes';

export class AppError extends Error {
    public statusCode: number;
    public type: ErrorType;

    private static errorCodeMapping: Record<ErrorType, number> = {
        [ErrorType.VALIDATION_ERROR]: 400,
        [ErrorType.NOT_FOUND]: 404,
        [ErrorType.DUPLICATE_VALUE]: 409,
        [ErrorType.SCHEMA_VALIDATE]: 422,
        [ErrorType.DECLINED]: 403,
        [ErrorType.UNAUTHORIZED]: 401
    };

    constructor(message: string, type: ErrorType) {
        super(message);
        this.type = type;
        this.statusCode = AppError.errorCodeMapping[type] || 500;
        this.name = this.constructor.name;
    }
}