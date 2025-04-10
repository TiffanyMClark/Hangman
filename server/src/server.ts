import express, { Request, Response } from "express";
import dotenv, { config } from "dotenv";
import router from "./routes/riddleRoute";
import path from "path";
import corsMiddleware from "./middleware/corsMiddleware"; // Use the middleware here
import sequelize from "./config/connection"; // Import the sequelize instance

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Use the imported CORS middleware for all routes

app.use(corsMiddleware);
// Serve static files from the client build directory
const clientDistPath = path.join(process.cwd(), "client", "dist");

app.use(express.static(clientDistPath));

app.get("/", (_req: Request, res: Response) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

app.use(express.static(clientDistPath));

// Use the riddle route for any requests starting with '/riddle'
app.use("/api", router);

// Serve the index.html file for all non-API routes
app.get("*", (_req: Request, res: Response) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
});
