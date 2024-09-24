"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemberDetails = exports.makePayment = exports.memberLogin = exports.createMember = void 0;
const Member_1 = __importDefault(require("../models/Member"));
const notifications_1 = require("../utils/notifications");
const utils_1 = require("../utils/utils");
const configs_1 = require("../configs");
const stripe_1 = __importDefault(require("stripe"));
const createMember = async (req, res) => {
    try {
        const { name, email } = req.body;
        const validationResult = utils_1.createSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                error: validationResult.error.details[0].message,
            });
        }
        const existingMember = await Member_1.default.findOne({ email });
        if (existingMember) {
            return res.status(400).json({
                error: "Email already exists",
            });
        }
        const { pin } = (0, notifications_1.generatePin)();
        const newMember = new Member_1.default({
            name,
            email,
            pin,
            verify: true,
        });
        await newMember.save();
        const token = (0, notifications_1.generateToken)(newMember._id, newMember.email);
        await (0, notifications_1.sendLoginPin)(email, pin);
        res
            .status(201)
            .json({ message: "Member registered successfully", newMember, token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.createMember = createMember;
const memberLogin = async (req, res) => {
    try {
        const { email, pin } = req.body;
        const validationResult = utils_1.loginSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                error: validationResult.error.details[0].message,
            });
        }
        const existingMember = await Member_1.default.findOne({ email });
        if (!existingMember) {
            return res.status(400).json({
                error: "Member not found",
            });
        }
        if (pin !== existingMember.pin) {
            return res.status(401).json({
                error: "Invalid pin",
            });
        }
        const token = (0, notifications_1.generateToken)(existingMember._id, existingMember.email);
        console.log("Generated Token:", token);
        res.status(200).json({
            message: "Member login successful",
            token,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.memberLogin = memberLogin;
const stripeSecretKey = configs_1.stripeSecret;
console.log("stripe secret", stripeSecretKey);
const stripeClient = new stripe_1.default(stripeSecretKey);
const makePayment = async (req, res) => {
    try {
        const { amount, token } = req.body;
        const charge = await stripeClient.charges.create({
            amount: amount * 100,
            currency: "usd",
            source: token,
            description: "Payment for account balance",
        });
        const memberId = req.member?._id;
        const member = await Member_1.default.findById(memberId);
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        const maintenanceFee = 10;
        const adminFee = 15;
        member.balance += amount - (maintenanceFee + adminFee);
        member.accountHistory.push({
            date: new Date(),
            description: "Account Credited",
            amount: amount,
        });
        member.accountHistory.push({
            date: new Date(),
            description: "Maintenance Fee Deduction",
            amount: maintenanceFee,
        });
        member.accountHistory.push({
            date: new Date(),
            description: "Admin Fee Deduction",
            amount: adminFee,
        });
        await member.save();
        res.status(200).json({ message: "Payment successful", charge });
    }
    catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.makePayment = makePayment;
const getMemberDetails = async (req, res) => {
    try {
        const memberId = req.member?._id;
        if (!memberId) {
            return res.status(401).json({ message: "Member not authenticated" });
        }
        const member = await Member_1.default.findById(memberId);
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }
        res
            .status(200)
            .json({ message: "Member details retrieved successfully", member });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getMemberDetails = getMemberDetails;
