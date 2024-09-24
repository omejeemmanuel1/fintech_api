"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeSecret = exports.jwtsecret = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.jwtsecret = String(process.env.JWT_SECRET_KEY);
exports.stripeSecret = String(process.env.stripe_secrete_key);
