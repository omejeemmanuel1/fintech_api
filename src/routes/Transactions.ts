import express from "express";
import {
  createTransaction,
  getTransactionHistory,
} from "../controllers/TransactionController";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.post("/create-transaction", authMiddleware, createTransaction);
router.get("/all_transactions", authMiddleware, getTransactionHistory);

export default router;
