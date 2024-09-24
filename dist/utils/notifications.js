"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLoginPin = exports.validateToken = exports.generateToken = exports.generatePin = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../configs");
const generatePin = () => {
    const pin = Math.floor(1000 + Math.random() * 9000);
    return { pin };
};
exports.generatePin = generatePin;
const generateToken = (_id, email) => {
    const payload = {
        _id,
        email,
    };
    console.log("payload:", payload);
    try {
        const token = jsonwebtoken_1.default.sign(payload, configs_1.jwtsecret, { expiresIn: "30d" });
        return token;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error generating token");
    }
};
exports.generateToken = generateToken;
const validateToken = (member, token) => {
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, configs_1.jwtsecret);
        if (decodedToken._id !== member._id ||
            decodedToken.email !== member.email) {
            return false;
        }
        const expiry = new Date(decodedToken.exp * 1000);
        if (expiry.getTime() < new Date().getTime()) {
            return false;
        }
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
};
exports.validateToken = validateToken;
const sendLoginPin = async (email, pin) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.smtp_host,
            port: 465,
            secure: true,
            auth: {
                user: process.env.sendinblue_user,
                pass: process.env.sendinblue_pass,
            },
        });
        const mailOptions = {
            from: "Semako <noreply@semako-mails.com>",
            to: email,
            subject: "Login Pin",
            html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5e7e8; text-align: center;">
              <h2 style="color: #21502c;">Account Login Pin</h2>
              <p style="color: #6c757d;">Below is your PIN:</p>
              <h1 style="color: #21502c;font-size: 40px; margin-top: 10px;">${pin}</h1>
              <p style="color: #6c757d;">Please enter this Pin to login.</p>
              <p style="color: #6c757d; text-align: center;">Thank you for choosing Semako!</p>
            </div>
          `,
        };
        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.error(error);
        throw new Error("Error sending account verification OTP");
    }
};
exports.sendLoginPin = sendLoginPin;
