import Joi from "joi";

export const queryParamsSchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    sort: Joi.string().uppercase().valid("ASC", "DESC").default("ASC"),
    pageSize: Joi.number().integer().min(0).max(50).default(50),
    year: Joi.number().integer().min(1900).max(2199),
    genre: Joi.string()
});