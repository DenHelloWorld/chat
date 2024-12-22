import { Router, Request, Response } from 'express';
import mongoService from '../db/mongo.service';
import { WebSocketService } from '../ws/ws.service';
import { getGandomStoicQuote } from '../features/quotable/quotable.commands';

const router: Router = Router();

const chatRoutes = (wsService: WebSocketService) => {
  router.get('/health', async (req: Request, res: Response) => {
    const isConnected = await mongoService.testConnection();

    if (isConnected) {
      res.status(200).send('MongoDB connection is successful');
    } else {
      res.status(500).send('MongoDB connection failed');
    }
  });

  router.get('/random-quote', async (req: Request, res: Response) => {
    const quote = await getGandomStoicQuote();
    if (quote) {
      res.json(quote);
    } else {
      res.status(500).json({ error: 'Failed to fetch quote' });
    }
  });

  router.post('/broadcast-message', (req: Request, res: Response) => {
    const message = req.body.message;
    wsService.broadcast(message);
    res.status(200).send('Message sent');
  });

  return router;
};

export default chatRoutes;
