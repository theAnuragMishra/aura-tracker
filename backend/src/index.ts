import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import "dotenv/config";
import profRoutes from "./professor/prof.routes";
import eventRoutes from "./events/events.routes";

const app = express();
// dotenv.config();
const PORT = process.env.PORT || 5173;

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/prof", profRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Aura Stars!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
