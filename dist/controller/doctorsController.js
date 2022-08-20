"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReport = exports.updateReports = exports.getSingleReport = exports.getReports = exports.reports = void 0;
const uuid_1 = require("uuid");
const doctors_1 = require("../model/doctors");
const utils_1 = require("../utils/utils");
async function reports(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validateReports = utils_1.createReportSchema.validate(req.body, utils_1.options);
        if (validateReports.error) {
            return res.status(400).json({
                Error: validateReports.error.details[0].message
            });
        }
        const record = await doctors_1.doctorInstance.create({ ...req.body, id });
        res.status(201).json({
            msg: "You have successfully created a report",
            record
        });
    }
    catch (error) {
        res.status(201).json({
            msg: 'failed to create',
            route: '/create'
        });
    }
}
exports.reports = reports;
async function getReports(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        const record = await doctors_1.doctorInstance.findAndCountAll({ limit, offset });
        res.status(200).json({
            msg: "You have successfully fetch all reports",
            count: record.count,
            record: record.rows
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: "/read"
        });
    }
}
exports.getReports = getReports;
async function getSingleReport(req, res, next) {
    try {
        const { id } = req.params;
        const record = await doctors_1.doctorInstance.findOne({ where: { id } });
        return res.status(200).json({
            msg: "Succesfully gotten user report",
            record
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read single todo",
            route: "/read/:id"
        });
    }
}
exports.getSingleReport = getSingleReport;
async function updateReports(req, res, next) {
    try {
        const { id } = req.params;
        const { patientName, age, hospitalName, weight, height, bloodGroup, genotype, bloodPressure, HIV_status, hepatitis } = req.body;
        const validationReports = utils_1.updateReportSchema.validate(req.body, utils_1.options);
        if (validationReports.error) {
            return res.status(400).json({
                Error: validationReports.error.details[0].message
            });
        }
        const report = await doctors_1.doctorInstance.findOne({ where: { id } });
        if (!report) {
            return res.status(404).json({
                Error: "Cannot find existing report",
            });
        }
        const updatedReport = await report.update({
            patientName: patientName,
            age: age,
            hospitalName: hospitalName,
            weight: weight,
            height: height,
            bloodGroup: bloodGroup,
            genotype: genotype,
            bloodPressure: bloodPressure,
            HIV_status: HIV_status,
            hepatitis: hepatitis
        });
        res.status(200).json({
            msg: "You have successfully updated your report",
            updatedReport
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to update",
            route: "/update/:id"
        });
    }
}
exports.updateReports = updateReports;
async function deleteReport(req, res, next) {
    try {
        const { id } = req.params;
        const report = await doctors_1.doctorInstance.findOne({ where: { id } });
        if (!report) {
            return res.status(404).json({
                msg: "cannot find report"
            });
        }
        const deleteInfo = await report.destroy();
        return res.status(200).json({
            msg: "report successfully deleted",
            deleteReport
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to delete",
            route: "/delete/:id"
        });
    }
}
exports.deleteReport = deleteReport;
