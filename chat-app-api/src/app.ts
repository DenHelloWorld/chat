import express, { Application, Request, Response } from 'express';
import statusRoute from './routes/index';

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(statusRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
