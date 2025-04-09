import { Request, Response } from 'express';
import Riddle from '../models/riddle';
import { getFilteredRiddle } from '../utiils/riddleFetcher';

export const fetchAndStoreRiddle = async (req: Request, res: Response) => {
  try {
    const { question, answer } = await getFilteredRiddle();
    const newRiddle = await Riddle.create({ question, answer });

    res.json({ id: newRiddle.id, question: newRiddle.question });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const validateAnswer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userAnswer } = req.body;

  const riddle = await Riddle.findByPk(id);

  if (!riddle) {
    return res.status(404).json({ error: 'Riddle not found' });
  }

  const isCorrect = userAnswer.toLowerCase() === riddle.answer.toLowerCase();

  res.json({ correct: isCorrect });
};
