import Joi from 'joi';

export const tipSchema = Joi.object({
    client_id: Joi.number()
        .precision(3)
        .positive(),

    user_id: Joi.number()
        .integer()
        .positive()
        .required(),

    tip_date: Joi.date()
        .iso()
        .required(),
});
