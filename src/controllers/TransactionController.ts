import { Response } from "express";
import { AuthRequest } from "../middlewares/auth"; // Import the AuthRequest type
import Transaction from "../models/Transaction";
import { v4 as uuidv4 } from "uuid";
import { options, transactionSchema } from "../utils/utils";

export const createTransaction = async (req: AuthRequest, res: Response) => {
  const { error } = transactionSchema.validate(req.body, options);
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((err) => err.message) });
  }

  const {
    amount,
    recipient_account_number,
    sender_account_number,
    description,
  } = req.body;

  try {
    const transaction = new Transaction({
      transaction_id: uuidv4(),
      amount,
      recipient_account_number,
      sender_account_number,
      description,
      user: req.userId,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getTransactionHistory = async (
  req: AuthRequest,
  res: Response
) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const transactions = await Transaction.find({ user: req.userId })
      .skip((+page - 1) * +limit)
      .limit(+limit);

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
