import { Router } from 'express';
import { getRiddleWord } from '../controllers/game.controller';

const router = Router();

router.get('/riddle', getRiddleWord);

export default router;
