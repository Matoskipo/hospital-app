"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDoctor = exports.LoginDoctor = exports.RegisterDoctor = void 0;
const uuid_1 = require("uuid");
const doctorModel_1 = require("../model/doctorModel");
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const reportModel_1 = require("../model/reportModel");
async function RegisterDoctor(req, res, next) {
    // create a todo
    const doctorId = (0, uuid_1.v4)();
    // let users = { ...req.body, id };
    try {
        console.log(req.body);
        const validateResult = utils_1.createDoctorSchema.validate(req.body, utils_1.options);
        if (validateResult.error) {
            return res
                .status(400)
                .json({ Error: validateResult.error.details[0].message });
        }
        const duplicateEmail = await doctorModel_1.DoctorsInstance.findOne({
            where: { email: req.body.email },
        });
        if (duplicateEmail) {
            return res.status(409).json({ msg: "Email has been used by another doctor" });
        }
        const duplicatePhoneNumber = await doctorModel_1.DoctorsInstance.findOne({
            where: { phoneNumber: req.body.phoneNumber },
        });
        if (duplicatePhoneNumber) {
            return res
                .status(409)
                .json({ msg: "Phone number has been used by another user" });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const doctors = {
            id: doctorId,
            DoctorsName: req.body.DoctorsName,
            email: req.body.email,
            specialization: req.body.specialization,
            gender: req.body.gender,
            phoneNumber: req.body.phoneNumber,
            password: passwordHash,
        };
        const record = await doctorModel_1.DoctorsInstance.create(doctors);
        // return res
        //   .status(200)
        //   .json({ msg: "You have successfully created a user", record });
        res.redirect('/');
    }
    catch (err) {
        console.log(req.body);
        res.status(500).json({
            msg: "Failed to create user",
            route: "/register",
        });
    }
}
exports.RegisterDoctor = RegisterDoctor;
async function LoginDoctor(req, res, next) {
    const doctorId = (0, uuid_1.v4)();
    try {
        const validateResult = utils_1.loginSchema.validate(req.body, utils_1.options);
        if (validateResult.error) {
            return res
                .status(400)
                .json({ Error: validateResult.error.details[0].message });
        }
        const doctor = await doctorModel_1.DoctorsInstance.findOne({
            where: { email: req.body.email },
        });
        // console.log(Doctor);
        const { id } = doctor;
        // console.log(id);
        console.log("before");
        const token = (0, utils_1.generateToken)({ id });
        console.log("after");
        console.log(token);
        const validUser = await bcryptjs_1.default.compare(req.body.password, doctor.password);
        if (!validUser) {
            res.status(401).json({
                msg: "Incorrect password",
            });
        }
        if (validUser) {
            res.status(200).cookie('token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: 'strict',
                httpOnly: true
            }).cookie('userid', doctor.id, {
                maxAge: 1000 * 60 * 60 * 24 * 7,
                sameSite: 'strict',
                httpOnly: true
            });
            res.status(200).json({
                msg: "Login Successfully",
                token,
                doctor,
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Failed to login",
            route: "/login",
        });
    }
}
exports.LoginDoctor = LoginDoctor;
// GET all Todo list
async function getDoctor(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        // const record = await TodoInstance.findAll({ where: {}, limit });
        const record = await doctorModel_1.DoctorsInstance.findAndCountAll({
            limit,
            offset,
            include: [{ model: reportModel_1.patientInstance, as: "Patients" }],
        });
        res.status(200).json({
            msg: "You have successfully fetch all Doctors",
            count: record.count,
            record: record.rows,
        });
    }
    catch (err) {
        res.status(500).json({
            msg: "Failed to fetch all Doctors",
            route: "/read",
        });
    }
}
exports.getDoctor = getDoctor;
