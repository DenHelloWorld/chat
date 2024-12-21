import express, { Application, Request, Response } from 'express';
import { createServer } from 'node:http';
import WebSocket from 'ws';
import mongoService from './db/mongo.service';

const app: Application = express();
const server = createServer(app);
const wss = new WebSocket.Server({ server });
const port = 3000;

app.use(express.json());

app.use('/health', async (req: Request, res: Response) => {
  const isConnected = await mongoService.testConnection();

  if (isConnected) {
    res.status(200).send('MongoDB connection is successful');
  } else {
    res.status(500).send('MongoDB connection failed');
  }
});

wss.on('connection', (ws: WebSocket) => {
  console.log('a user connected');

  ws.on('message', (message) => {
    console.log('received: %s', message);
  });

  ws.on('close', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
