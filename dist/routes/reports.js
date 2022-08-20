"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reportController_1 = require("../controller/reportController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
/* GET Todos. */
router.post("/create", auth_1.auth, reportController_1.PatientRecord);
router.get("/read", reportController_1.getPatientRecord);
router.get("/read/:id", reportController_1.getSinglePatientRecord);
router.patch("/update/:id", auth_1.auth, reportController_1.updatePatientRecord);
router.delete("/delete/:id", auth_1.auth, reportController_1.deletePatientRecord);
router.post("/delete/:id", auth_1.auth, reportController_1.deletePatientRecord);
router.get("/read/unique/:id", reportController_1.getUniquePatient);
router.get("/update/unique/:id", reportController_1.updateUniquePatient);
router.post("/update/:id", reportController_1.updatePatientRecord);
exports.default = router;
