const express = require("express");
const app = express();
import path from "path";
const riddleRoutes = require("./routes/riddleRoutes");

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/riddles", riddleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
