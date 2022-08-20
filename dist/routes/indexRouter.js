"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reportController_1 = require("../controller/reportController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.render('index');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/register', (req, res) => {
    res.render('register');
});
router.get('/patient-reg', (req, res) => {
    res.render('patient-reg');
});
router.get('/patient/delete', (req, res) => {
    res.render('delete');
});
router.get('/dashboard', auth_1.auth, reportController_1.getSinglePatientRecord);
router.get('/patient/:id', auth_1.auth, reportController_1.getUniquePatient);
exports.default = router;
