import express from "express";
import dotenv from "dotenv";
import { getKeyword } from "./services/charadesService";


dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/hangman", async (_req, res) => {
    try {
        const word = await getKeyword();
        res.json({keyword: word});
        } catch (error) {
            res.status(500).json({error: "Failed to fetch keyword"});
        }
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`); });

