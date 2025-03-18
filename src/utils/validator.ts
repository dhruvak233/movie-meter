import {Schema} from "joi";
import {BadRequestError} from "../errors/customErrors";

export const validateSchema = async <T>(schema: Schema, value: T): Promise<T> => {
    try {
        return await schema.validateAsync(value);
    } catch (err: any) {
        throw new BadRequestError(err?.message || "Invalid request data");
    }
};