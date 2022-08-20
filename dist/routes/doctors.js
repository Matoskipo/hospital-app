"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctorController_1 = require("../controller/doctorController");
const router = express_1.default.Router();
router.get('/login', (req, res, next) => {
    res.render('login');
});
router.post("/register", doctorController_1.RegisterDoctor);
router.post("/login", doctorController_1.LoginDoctor);
router.get("/alldoctors", doctorController_1.getDoctor);
exports.default = router;
