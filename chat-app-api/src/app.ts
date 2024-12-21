import express, { Application, Request, Response } from 'express';
import statusRoute from './routes/index';
import mongoService from './db/mongo.service';

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(statusRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/health', async (req: Request, res: Response) => {
  const isConnected = await mongoService.testConnection();

  if (isConnected) {
    res.status(200).send('MongoDB connection is successful');
  } else {
    res.status(500).send('MongoDB connection failed');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
