import joi from 'joi';

export const registerSchema = joi.object({
    username: joi.string()
        .min(5)
        .max(30)
        .required().messages({
            'string.base': 'A data do serviço deve ser uma data válida.',
            'any.required': 'A data do serviço é obrigatória.',
        }),

    email: joi.string()
        .email()
        .required(),

    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{3,30}$'))
        .required(),

    confirmPassword: joi.string()
        .valid(joi.ref('password'))
        .required(),
});


export default registerSchema;
