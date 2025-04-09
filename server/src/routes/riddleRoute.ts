import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ riddle: 'What is black and white and read all over?' });
});

export default router;
