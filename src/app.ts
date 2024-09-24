import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import db from "./configs/config";
import userRoutes from "./routes/Users";
import transactionRoutes from "./routes/Transactions";
import rateLimit from "express-rate-limit";

dotenv.config();
const app = express();

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});

// Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(logger("dev"));

// Database connection
db()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((err) => {
    console.log("Error connecting to database:", err.message);
  });

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Fintech API" });
});

app.use("/user", userRoutes);
app.use("/transaction", transactionRoutes);

const port = 8999;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
