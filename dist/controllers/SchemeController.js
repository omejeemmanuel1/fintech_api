"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollInScheme = exports.getAllSchemes = void 0;
const Sheme_1 = __importDefault(require("../models/Sheme"));
const Member_1 = __importDefault(require("../models/Member"));
const getAllSchemes = async (req, res) => {
    try {
        const schemes = await Sheme_1.default.find();
        res.status(200).json(schemes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getAllSchemes = getAllSchemes;
const enrollInScheme = async (req, res) => {
    try {
        const { schemeName } = req.body;
        if (!schemeName) {
            res.status(400).json({ message: "Scheme name is required" });
            return;
        }
        const memberId = req.member?._id;
        if (!memberId) {
            res.status(401).json({ message: "Member not authenticated" });
            return;
        }
        const member = await Member_1.default.findById(memberId);
        if (!member) {
            res.status(404).json({ message: "Member not found" });
            return;
        }
        const isEnrolled = member.schemes.some((s) => s.name === schemeName);
        if (isEnrolled) {
            res.status(400).json({
                message: `Member is already enrolled in the scheme '${schemeName}'`,
            });
            return;
        }
        const schemeDetails = getSchemeDetailsByName(schemeName);
        if (!schemeDetails) {
            res.status(404).json({ message: "Scheme not found" });
            return;
        }
        member.schemes.push({
            name: schemeName,
            interestRate: schemeDetails.interestRate,
            maturityDate: schemeDetails.maturityDate,
        });
        await member.save();
        res.status(200).json({
            message: `Enrolled in the scheme '${schemeName}' successfully`,
            member,
        });
    }
    catch (error) {
        console.error("Error enrolling member in scheme:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.enrollInScheme = enrollInScheme;
const getSchemeDetailsByName = (schemeName) => {
    const schemes = {
        "Fixed Deposit Scheme": {
            interestRate: 8,
            maturityDate: calculateMaturityDate(12),
        },
        "Monthly Savings Scheme": {
            interestRate: 5,
            maturityDate: calculateMaturityDate(24),
        },
        "High-Interest Investment Scheme": {
            interestRate: 13,
            maturityDate: calculateMaturityDate(36),
        },
        "Education Fund Scheme": {
            interestRate: 10,
            maturityDate: calculateMaturityDate(18),
        },
        "Retirement Savings Scheme": {
            interestRate: 12,
            maturityDate: calculateMaturityDate(48),
        },
        "Emergency Fund Scheme": {
            interestRate: 8,
            maturityDate: calculateMaturityDate(12),
        },
        "Wealth Building Scheme": {
            interestRate: 5,
            maturityDate: calculateMaturityDate(24),
        },
        "Real Estate Investment Scheme": {
            interestRate: 12,
            maturityDate: calculateMaturityDate(60),
        },
        "Gold Savings Scheme": {
            interestRate: 15,
            maturityDate: calculateMaturityDate(36),
        },
        "Stock Market Investment Scheme": {
            interestRate: 13,
            maturityDate: calculateMaturityDate(48),
        },
    };
    return schemes[schemeName];
};
const calculateMaturityDate = (months) => {
    const currentDate = new Date();
    const maturityDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + months, currentDate.getDate());
    return maturityDate;
};
