import express, {Request, Response, NextFunction } from "express";
import { getSinglePatientRecord, getUniquePatient } from "../controller/reportController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get('/', (req: Request, res: Response)=>{
    res.render('index')
  })

router.get('/login', (req: Request, res: Response)=>{
    res.render('login')
})



router.get('/register', (req: Request, res: Response)=>{
res.render('register')
})
router.get('/patient-reg', (req: Request, res: Response)=>{
res.render('patient-reg')
})



router.get('/patient/delete', (req:Request, res:Response)=>{
  res.render('delete')
})





router.get('/dashboard', auth, getSinglePatientRecord)
router.get('/patient/:id', auth, getUniquePatient)






export default router;
