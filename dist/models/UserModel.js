"use strict";
// src/models/Member.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const memberSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    contactDetails: { type: String, required: true, unique: true },
    pin: { type: String, required: true, minlength: 4, maxlength: 4 },
    balance: { type: Number, default: 0 },
    accountHistory: [
        {
            date: { type: Date, default: Date.now },
            description: { type: String, required: true },
            amount: { type: Number, required: true },
        },
    ],
    schemes: [
        {
            name: { type: String, required: true },
            interestRate: { type: Number, required: true },
            maturityDate: { type: Date, required: true },
        },
    ],
});
const Member = mongoose_1.default.model("Member", memberSchema);
exports.default = Member;
