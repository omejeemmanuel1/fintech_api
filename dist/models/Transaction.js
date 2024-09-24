"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    transaction_id: { type: String, required: true },
    amount: { type: Number, required: true },
    recipient_account_number: { type: String, required: true },
    sender_account_number: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
});
const Transaction = mongoose_1.default.model("Transaction", transactionSchema);
exports.default = Transaction;
