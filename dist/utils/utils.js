"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.transactionSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.empty": "Email cannot be empty",
        "string.email": "Email must be a valid email",
    }),
    password: joi_1.default.string().min(6).required().messages({
        "string.empty": "Password cannot be empty",
        "string.min": "Password should have a minimum length of 6 characters",
    }),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.empty": "Email cannot be empty",
        "string.email": "Email must be a valid email",
    }),
    password: joi_1.default.string().min(6).required().messages({
        "string.empty": "Password cannot be empty",
        "string.min": "Password should have a minimum length of 6 characters",
    }),
});
exports.transactionSchema = joi_1.default.object({
    amount: joi_1.default.number().positive().required().messages({
        "number.base": "Amount must be a number",
        "number.positive": "Amount must be a positive number",
        "any.required": "Amount is required",
    }),
    recipient_account_number: joi_1.default.string().length(10).required().messages({
        "string.length": "Recipient account number must be 10 characters long",
        "any.required": "Recipient account number is required",
    }),
    sender_account_number: joi_1.default.string().length(10).required().messages({
        "string.length": "Sender account number must be 10 characters long",
        "any.required": "Sender account number is required",
    }),
    description: joi_1.default.string().optional().allow("").messages({
        "string.base": "Description must be a string",
    }),
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
