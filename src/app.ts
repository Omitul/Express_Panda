import cors from 'cors';
import express, { Request, Response } from 'express';
const app = express();
const port = 3000;

///its a parser

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

console.log(process.cwd());

export default app;
