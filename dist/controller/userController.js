"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDoctor = exports.RegisterDoctor = void 0;
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../model/user");
const utils_1 = require("../utils/utils");
async function RegisterDoctor(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validatioReport = utils_1.registerSchema.validate(req.body, utils_1.options);
        if (validatioReport.error) {
            return res.status(404).json({
                Error: validatioReport.error.details[0].message
            });
        }
        const duplicateEmail = await user_1.DoctorInstance.findOne({ where: { email: req.body.email } });
        if (duplicateEmail) {
            return res.status(409).json({
                msg: "Email is used, please change email"
            });
        }
        const duplicatePhone = await user_1.DoctorInstance.findOne({ where: { phonenumber: req.body.phonenumber } });
        if (duplicatePhone) {
            return res.status(409).json({
                msg: "Phone number is used"
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const record = await user_1.DoctorInstance.create({
            id: id,
            DoctorsName: req.body.DoctorsName,
            email: req.body.email,
            specialization: req.body.specialization,
            gender: req.body.gender,
            phonenumber: req.body.phonenumber,
            password: passwordHash
        });
        res.status(201).json({
            msg: "Successfully created a new doctor",
            record,
        });
    }
    catch (error) {
        res.status(401).json({
            msg: 'failed to register',
            route: '/register',
            error: error,
        });
    }
}
exports.RegisterDoctor = RegisterDoctor;
async function LoginDoctor(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validateReport = utils_1.loginSchema.validate(req.body, utils_1.options);
        if (validateReport.error) {
            return res.status(400).json({
                Error: validateReport.error.details[0].message
            });
        }
        const Doctor = await user_1.DoctorInstance.findOne({ where: { email: req.body.email } });
        const { id } = Doctor;
        const token = (0, utils_1.generateToken)({ id });
        const validDoctor = await bcryptjs_1.default.compare(req.body.password, Doctor.password);
        if (!validDoctor) {
            res.status(401).json({
                msg: "Password not recognised"
            });
        }
        if (validDoctor) {
            res.status(201).json({
                msg: "Successfully logged in",
                token,
                Doctor
            });
        }
    }
    catch (error) {
        res.status(401).json({
            msg: 'failed to login',
            route: '/login'
        });
    }
}
exports.LoginDoctor = LoginDoctor;
