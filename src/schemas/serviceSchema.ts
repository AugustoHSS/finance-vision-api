import Joi from 'joi';

export const serviceSchema = Joi.object({


    bossId: Joi.number()
        .integer()
        .positive()
        .required(),

    clientId: Joi.number()
        .integer()
        .positive(),

    serviceDate: Joi.date()
        .iso()
        .required(),

    killCount: Joi.number()
        .integer()
        .positive()
        .required(),

    paymentType: Joi.string()
        .valid('USD', 'M')
        .required(),

    isTicket: Joi.boolean()
        .required(),

    value: Joi.number()
        .positive()
        .required(),

});
