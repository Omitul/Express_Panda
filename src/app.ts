import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { StudentRoutes } from './app/modules/students/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import GlobalErrorHandler from './app/config/middleWares/GlobalErrorHandlers';
import notFound from './app/config/middleWares/notFount';
import router from './app/route';
const app = express();

///its a parser

app.use(express.json());
app.use(cors());

///application routes
app.use('/api/v1', router);

app.use(GlobalErrorHandler);

// not found route
app.use(notFound);

const getHellocontroller = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getHellocontroller);

console.log(process.cwd());

export default app;
