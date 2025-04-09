import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS middleware
import router from './routes/riddleRoute';
import corsMiddleware from './middleware/corsMiddleware'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173',  // Allow your client running on port 5173
  methods: ['GET', 'POST'],        // You can specify allowed methods
  allowedHeaders: ['Content-Type'], // Specify allowed headers (if needed)
}));

// Test route to check if the server is working
app.get('/', (_req: Request, res: Response) => {
  res.send('Server is working!');
});

// Use the riddle route for any requests starting with '/riddle'
app.use('/riddle', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
