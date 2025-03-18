export class CustomError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends CustomError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

export class BadRequestError extends CustomError {
    constructor(message = "Bad request") {
        super(message, 400);
    }
}

export class InternalServerError extends CustomError {
    constructor(message = "Internal server error") {
        super(message, 500);
    }
}