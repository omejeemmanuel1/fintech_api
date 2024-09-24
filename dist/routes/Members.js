"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MemberController_1 = require("../controllers/MemberController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/create-account", MemberController_1.createMember);
router.post("/login-account", MemberController_1.memberLogin);
router.post("/make-payment", auth_1.auth, MemberController_1.makePayment);
router.get("/details", auth_1.auth, MemberController_1.getMemberDetails);
exports.default = router;
