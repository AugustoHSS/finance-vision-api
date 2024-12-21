import joi from 'joi';

export const registerSchema = joi.object({
    username: joi.string()
        .min(5)
        .max(30)
        .required(),

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
