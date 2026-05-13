import express, { Request, Response } from "express";
import cors from "cors";
import { scheduleRouter } from "./routes/schedule";
import { logger } from "./middleware/logger";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(logger);

// API routes
app.use("/api/schedule", scheduleRouter);

// Health endpoint
app.get("/health", (_req: Request, res: Response) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
