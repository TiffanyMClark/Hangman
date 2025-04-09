import { Request, Response } from "express";
import Riddle from "../models/riddle";
import { getFilteredRiddle } from "../utiils/riddleFetcher";

// Controller to fetch and store a riddle
export const fetchAndStoreRiddle = async (req: Request, res: Response) => {
  try {
    const { question, answer } = await getFilteredRiddle();
    console.log("Fetched Riddle:", { question, answer });
    const newRiddle = await Riddle.create({ question, answer });
    res.json({ id: newRiddle.id, question: newRiddle.question });
  } catch (error: any) {
    console.error("Error fetching or storing riddle:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Controller to validate the user's guess
export const validateAnswer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userAnswer } = req.body;

  try {
    const riddle = await Riddle.findByPk(id);

    if (!riddle) {
      return res.status(404).json({ error: "Riddle not found" });
    }

    const isCorrect = userAnswer.toLowerCase() === riddle.answer.toLowerCase();
    res.json({ correct: isCorrect });
  } catch (error: any) {
    console.error("Error validating answer:", error.message);
    res.status(500).json({ error: error.message });
  }
};
