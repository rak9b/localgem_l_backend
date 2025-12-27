import { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';

const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong!';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];

    if (err?.name === 'ZodError') {
        statusCode = httpStatus.BAD_REQUEST;
        message = 'Validation Error';
        errorSources = err.issues.map((issue: any) => ({
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
        }));
    } else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: process.env.NODE_ENV === 'development' ? err?.stack : null,
    });
};

export default globalErrorHandler;
