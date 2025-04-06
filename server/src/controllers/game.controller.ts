import { Request, Response } from 'express';
import { fetchRiddle } from '../services/riddle.service';
import UsedWord from '../models/UsedWord';

export const getRiddleWord = async (req: Request, res: Response) => {
  const riddle = await fetchRiddle();

  if (riddle.answer.split(' ').length > 1) {
    riddle.answer = riddle.answer.split(' ').join('');
  }

  if (riddle.answer.length < 5 || riddle.answer.length > 12) {
    return res.status(400).json({ error: 'Invalid riddle word length' });
  }

  await UsedWord.create({ word: riddle.answer, userId: req.body.userId });

  return res.json({ question: riddle.question, word: riddle.answer });
};
