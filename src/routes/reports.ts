import express from "express";
import {
  PatientRecord,
  getPatientRecord,
  getSinglePatientRecord,
  updatePatientRecord,
  deletePatientRecord,
  getUniquePatient,
  updateUniquePatient,
} from "../controller/reportController";
import { auth } from "../middleware/auth";


const router = express.Router();

/* GET Todos. */
router.post("/create", auth, PatientRecord);
router.get("/read", getPatientRecord);
router.get("/read/:id", getSinglePatientRecord);
router.patch("/update/:id", auth, updatePatientRecord);
router.delete("/delete/:id", auth, deletePatientRecord);

router.post("/delete/:id", auth, deletePatientRecord);

router.get("/read/unique/:id", getUniquePatient);
router.get("/update/unique/:id", updateUniquePatient);

router.post("/update/:id", updatePatientRecord);


export default router;
