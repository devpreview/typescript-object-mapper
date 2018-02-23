
export class ObjectMapperError extends Error {

    public readonly name: string;
    public readonly message: string;
    public readonly stack?: string;
    public readonly cause?: Error;

    public constructor(message?: string, cause?: Error) {
        super(message);
        this.name = this.constructor.name;
        this.message = message || 'Unexpected error';
        Error.captureStackTrace(this, this.constructor);
        this.cause = cause;
    }

}
