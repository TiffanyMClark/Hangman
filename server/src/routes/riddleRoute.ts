import express from "express";
import {
  fetchAndStoreRiddle,
  validateAnswer,
} from "../controller/riddleController";

const router = express.Router();

router.get("/riddles", fetchAndStoreRiddle);
router.post("/riddles/:id/validate", validateAnswer);

export default router;
