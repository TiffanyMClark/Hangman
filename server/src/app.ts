import express from 'express';
import gameRoutes from './routes/game.routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use('/api/game', gameRoutes); 
app.use(errorHandler);

export default app;
