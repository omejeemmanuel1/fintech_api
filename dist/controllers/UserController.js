"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const utils_1 = require("../utils/utils");
const register = async (req, res) => {
    const { error } = utils_1.registerSchema.validate(req.body, utils_1.options);
    if (error) {
        return res
            .status(400)
            .json({ errors: error.details.map((err) => err.message) });
    }
    const { email, password } = req.body;
    try {
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new User_1.default({ email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { error } = utils_1.loginSchema.validate(req.body, utils_1.options);
    if (error) {
        return res
            .status(400)
            .json({ errors: error.details.map((err) => err.message) });
    }
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30m",
        });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
exports.login = login;
