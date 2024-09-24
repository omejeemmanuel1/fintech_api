"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./configs/config"));
const Users_1 = __importDefault(require("./routes/Users"));
const Transactions_1 = __importDefault(require("./routes/Transactions"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Rate limiter
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 100,
});
// Middlewares
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use(limiter);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
// Database connection
(0, config_1.default)()
    .then(() => {
    console.log("Database connected successfully.");
})
    .catch((err) => {
    console.log("Error connecting to database:", err.message);
});
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the Fintech API" });
});
app.use("/user", Users_1.default);
app.use("/transaction", Transactions_1.default);
const port = 8999;
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
