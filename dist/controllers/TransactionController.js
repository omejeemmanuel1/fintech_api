"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionHistory = exports.createTransaction = void 0;
const Transaction_1 = __importDefault(require("../models/Transaction"));
const uuid_1 = require("uuid");
const utils_1 = require("../utils/utils");
const createTransaction = async (req, res) => {
    const { error } = utils_1.transactionSchema.validate(req.body, utils_1.options);
    if (error) {
        return res
            .status(400)
            .json({ errors: error.details.map((err) => err.message) });
    }
    const { amount, recipient_account_number, sender_account_number, description, } = req.body;
    try {
        const transaction = new Transaction_1.default({
            transaction_id: (0, uuid_1.v4)(),
            amount,
            recipient_account_number,
            sender_account_number,
            description,
            user: req.userId,
        });
        await transaction.save();
        res.status(201).json(transaction);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.createTransaction = createTransaction;
const getTransactionHistory = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const transactions = await Transaction_1.default.find({ user: req.userId })
            .skip((+page - 1) * +limit)
            .limit(+limit);
        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.getTransactionHistory = getTransactionHistory;
