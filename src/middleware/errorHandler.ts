import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customErrors";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
        return;
    }

    // Default to 500 Internal Server Error
    res.status(500).json({
        success: false,
        message: "Something went wrong, please try again later",
    });
};
