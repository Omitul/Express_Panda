import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  // const statusCode = 500;
  // const message = err.message || 'Something went wrong!';

  return res.status(httpStatus.NOT_FOUND).json({
    succees: false,
    message: 'API Not Found',
    error: '',
  });
};

export default notFound;
