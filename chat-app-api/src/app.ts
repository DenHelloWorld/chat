import express, { Application } from 'express';
import { createServer } from 'node:http';
import { WebSocketService } from './ws/ws.service';
import { Server as HttpServer } from 'node:http';
import chatRoutes from './routes/chat.routes';
import 'dotenv/config';

class App {
  private app: Application = express();
  private server: HttpServer = createServer(this.app);
  private wsService = new WebSocketService(this.server);

  private port = process.env.API_PORT;

  constructor() {
    this.setupRoutes();
  }

  private setupRoutes() {
    this.app.use(express.json());
    this.app.use('/chat', chatRoutes(this.wsService));
  }

  public start() {
    this.server.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

new App().start();
