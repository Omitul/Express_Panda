import { NextFunction, Request, Response } from 'express';

const GlobalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = err.message || 'Something went wrong!';

  return res.status(statusCode).json({
    succees: false,
    message,
    error: err,
  });
};

export default GlobalErrorHandler;
