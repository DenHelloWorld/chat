import express, { Application, Request, Response } from 'express';
import { createServer } from 'node:http';
import mongoService from './db/mongo.service';
import { WebSocketService } from './ws/ws.service';
import { Server as HttpServer } from 'node:http';
import 'dotenv/config';

class App {
  private app: Application = express();
  private server: HttpServer = createServer(this.app);
  private wsService: WebSocketService = new WebSocketService(this.server);
  private port = process.env.API_PORT;

  constructor() {
    this.setupRoutes();
  }

  private setupRoutes() {
    this.app.use(express.json());

    this.app.use('/health', async (req: Request, res: Response) => {
      const isConnected = await mongoService.testConnection();

      if (isConnected) {
        res.status(200).send('MongoDB connection is successful');
      } else {
        res.status(500).send('MongoDB connection failed');
      }
    });

    this.app.post('/broadcast-message', (req: Request, res: Response) => {
      const message = req.body.message;
      this.wsService.broadcast(message);
      res.status(200).send('Message sent');
    });
  }

  public start() {
    this.server.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

const app = new App();
app.start();
