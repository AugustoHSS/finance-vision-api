import Joi from 'joi';

const serviceSchema = Joi.object({
    serviceDate: Joi.date()
        .iso()
        .required(),

    value: Joi.number()
        .positive()
        .required(),

    bossId: Joi.number()
        .integer()
        .positive()
        .required(),

    clientId: Joi.number()
        .integer()
        .positive(),

    killCount: Joi.number()
        .integer()
        .positive()
        .required(),

    isTicket: Joi.boolean()
        .required(),
});

export default serviceSchema;
