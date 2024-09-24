"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TransactionController_1 = require("../controllers/TransactionController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/create-transaction", auth_1.authMiddleware, TransactionController_1.createTransaction);
router.get("/all_transactions", auth_1.authMiddleware, TransactionController_1.getTransactionHistory);
exports.default = router;
