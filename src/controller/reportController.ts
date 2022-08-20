import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { patientInstance } from "../model/reportModel";
import {
  createPatientSchema,
  options,
  updatePatientSchema,
} from "../utils/utils";
import { DoctorsInstance } from "../model/doctorModel";
// const createNamespace = require("cls-hooked").createNamespace;
// const session = createNamespace("my session");

export async function PatientRecord(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  // create a todo
  const id = uuidv4();

  try {
    // const req.user = session.get('user');
    // session.set("user", user);

    const verified = req.user;
    console.log(verified);
    const validateResult = createPatientSchema.validate(req.body, options);
    if (validateResult.error) {
      return res
        .status(400)
        .json({ Error: validateResult.error.details[0].message });
    }

    let patient = { id, ...req.body, doctorId: verified.id };
    // console.log(patient.doctorId);

    const record = await patientInstance.create(patient);
    // return res
    //   .status(201)
    //   .json({ msg: "You have successfully created a patient report", record });
    res.redirect('/dashboard')
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      msg: "Failed to create patient report",
      route: "/create",
    });
  }
}

// GET all Todo list
export async function getPatientRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    // const record = await TodoInstance.findAll({ where: {}, limit });
    const record = await patientInstance.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: DoctorsInstance,
          attributes: [
            "id",
            "DoctorsName",
            "email",
            "specialization",
            "phoneNumber",
          ],
          as: "Doctor",
        },
      ],
    });
    res.status(200).json({
      msg: "You have successfully fetch all patient reports",
      count: record.count,
      record: record.rows,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: "Failed to fetch all patient reports",
      route: "/read",
    });
  }
}

// GET Single Todo
export async function getSinglePatientRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // const doctor = req.params.doctor;
    // OR
    // console.log(req.params);
    // const { patientId } = req.params;

    const id  = req.cookies.userid;

    const record = await patientInstance.findAndCountAll({
      where: { doctorId: id },
    });

    // res.status(200).json({ msg: "You have successfully find your patient report", record });

    res.render('dashboard', { patientsDetail: record.rows })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Failed to read single patient report",
      route: "/read/:id",
    });
  }
}

export async function getUniquePatient (req: Request, res: Response, next: NextFunction){
  const uniqueId = req.params
  try{
    const record = await patientInstance.findOne({
      where: uniqueId 
    });

    // res.status(200).json({ msg: "Unique Patient Found", record });
    res.render('patient', {uniquePatient: record})

  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: "Failed to fetch unique patient",
      route: "/read/unique/:id",
    });
  }

}

export async function updateUniquePatient (req: Request, res: Response, next: NextFunction){
  const uniqueId = req.params
  try{
    const record = await patientInstance.findOne({
      where: uniqueId 
    });

    // res.status(200).json({ msg: "Unique Patient Found", record });
    res.render('edit', {updateUniquePatient: record})

  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: "Failed to fetch unique patient",
      route: "/update/unique/:id",
    });
  }

}




/* UPDATE Todos listing. */
export async function updatePatientRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // create a todo
  const id = uuidv4();
  try {
    const patientId = req.params;
    const {
      patientName,
      age,
      hospitalName,
      weight,
      height,
      bloodGroup,
      genotype,
      bloodPressure,
      HIV_status,
      hepatitis,
    } = req.body;
    const validateResult = updatePatientSchema.validate(req.body, options);
    if (validateResult.error) {
      return res
        .status(400)
        .json({ Error: validateResult.error.details[0].message });
    }

    const record = await patientInstance.findOne({ where: patientId });
    if (!record) {
      return res.status(404).json({
        Error: "Cannot find existing patient report",
      });
    }
    const updatedRecord = await record.update({
      patientName: patientName,
      age: age,
      hospitalName: hospitalName,
      weight: weight,
      height: height,
      bloodGroup: bloodGroup,
      genotype: genotype,
      bloodPressure: bloodPressure,
      HIV_status: HIV_status,
      hepatitis: hepatitis,
    });
    // res.status(202).json({
    //   msg: "You have successfully updated your patient report",
    //   record: updatedRecord,
    // });
    return res.redirect('/dashboard')
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: "Failed to update patient report",
      route: "/update/:id",
    });
  }
}

// DELETE Todo
export async function deletePatientRecord(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //  const id = req.params.id    OR
    // const { patientId } = req.params;

    const patientId = req.params;
    const record = await patientInstance.findOne({ where: patientId });
    if (!record) {
      return res.status(404).json({ msg: "Can not find patient report" });
    }
    const deletedRecord = await record.destroy();
    // return res
    //   .status(200)
    //   .json({ msg: "Successfully deleted patient report", deletedRecord });
    res.redirect('/dashboard')
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: "Failed to delete patient report",
      route: "/delete/:id",
    });
  }
}
