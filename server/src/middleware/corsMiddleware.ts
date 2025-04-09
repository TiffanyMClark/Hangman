// This file should now just be a place for middleware, not routing logic.
import cors from 'cors';

const corsMiddleware = cors({
  origin: 'http://localhost:5173',  // Allow your client running on port 5173
  methods: ['GET', 'POST'],        // Specify allowed methods
  allowedHeaders: ['Content-Type'], // Specify allowed headers (if needed)
});

export default corsMiddleware;
