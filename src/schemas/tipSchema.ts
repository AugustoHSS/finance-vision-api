import Joi from 'joi';

export const tipSchema = Joi.object({
    clientId: Joi.number()
        .precision(3)
        .positive(),

    date: Joi.date()
        .iso()
        .required(),

    value: Joi.number()
        .precision(3)
        .positive()
        .required(),
});
