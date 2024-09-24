"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SchemeController_1 = require("../controllers/SchemeController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get("/schemes", SchemeController_1.getAllSchemes);
router.post("/enroll", auth_1.auth, SchemeController_1.enrollInScheme);
exports.default = router;
