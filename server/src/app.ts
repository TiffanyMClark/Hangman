const express = require('express');
const app = express();
const riddleRoutes = require('./routes/riddleRoutes');

app.use(express.json());
app.use('/api/riddles', riddleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
