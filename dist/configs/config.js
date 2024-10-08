"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI ||
    "mongodb+srv://omejeemmanuel:zgzr9veQL593zUv5@cluster0.a7kti.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const db = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI, {});
        console.log("MongoDB connected Successfully");
    }
    catch (err) {
        console.error(`MongoDB connection error: ${err}`);
        process.exit(1);
    }
};
exports.default = db;
