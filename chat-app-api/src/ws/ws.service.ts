import WebSocket, { Server } from 'ws';
import { Server as HttpServer } from 'node:http';

export class WebSocketService {
  private wss: Server;

  constructor(server: HttpServer) {
    this.wss = new WebSocket.Server({ server });
    this.init();
  }

  private init() {
    this.wss.on('connection', (ws: WebSocket) => {
      console.log('A user connected');

      ws.on('message', (message) => {
        console.log('Received: %s', message);
      });

      ws.on('close', () => {
        console.log('User disconnected');
      });
    });
  }

  public broadcast(message: string) {
    this.wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

