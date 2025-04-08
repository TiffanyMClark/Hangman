import express from 'express';
import dotenv from 'dotenv';
import router from '../src/routes/riddleRoute' ;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (_req, res) => {
  res.send('Server is working!');
});



app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
