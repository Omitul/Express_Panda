import cors from 'cors';
import express, { Request, Response } from 'express';
import { StudentRoutes } from './app/modules/students/student.route';
const app = express();
const port = 3000;

///its a parser

app.use(express.json());
app.use(cors());

///application routes
app.use('/api/v1/students', StudentRoutes);

const getHellocontroller = (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', getHellocontroller);

console.log(process.cwd());

export default app;
