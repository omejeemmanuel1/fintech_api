import mongoose, { Document } from "mongoose";

export interface ITransaction extends Document {
  transaction_id: string;
  amount: number;
  recipient_account_number: string;
  sender_account_number: string;
  description: string;
  user: mongoose.Schema.Types.ObjectId;
}

const transactionSchema = new mongoose.Schema({
  transaction_id: { type: String, required: true },
  amount: { type: Number, required: true },
  recipient_account_number: { type: String, required: true },
  sender_account_number: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);
export default Transaction;
