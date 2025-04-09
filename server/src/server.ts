import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import router from './routes/riddleRoute';
import corsMiddleware from './middleware/corsMiddleware';  // Use the middleware here

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Use the imported CORS middleware for all routes

app.use(corsMiddleware);

// Test route to check if the server is working

app.get('/', (_req: Request, res: Response) => {
  res.send('Server is working!');
});

// Use the riddle route for any requests starting with '/riddle'

app.use('/riddle', router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
