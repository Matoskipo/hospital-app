import express, {Request, Response, NextFunction } from "express";
import {
  RegisterDoctor,
  LoginDoctor,
  getDoctor,
} from "../controller/doctorController";
import { getSinglePatientRecord } from "../controller/reportController";

const router = express.Router();

router.get('/login', (req:Request,res:Response, next:NextFunction)=>{
  res.render('login')
})

router.post("/register", RegisterDoctor);

router.post("/login", LoginDoctor);
router.get("/alldoctors", getDoctor);

export default router;
