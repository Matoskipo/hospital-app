import { Request, Response, NextFunction } from "express";
import { v4 as UUID4 } from "uuid";
import { DoctorsInstance } from "../model/doctorModel";
import {
  registerSchema,
  loginSchema,
  options,
  generateToken,
  createDoctorSchema,
} from "../utils/utils";
import bcrypt from "bcryptjs";
import { patientInstance } from "../model/reportModel";

export async function RegisterDoctor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // create a todo
  const doctorId = UUID4();
  // let users = { ...req.body, id };
  try {
    console.log(req.body)
    const validateResult = createDoctorSchema.validate(req.body, options);
    if (validateResult.error) {
      return res
        .status(400)
        .json({ Error: validateResult.error.details[0].message });
    }

    const duplicateEmail = await DoctorsInstance.findOne({
      where: { email: req.body.email },
    });
    if (duplicateEmail) {
     return res.status(409).json({ msg: "Email has been used by another doctor" });
    }

    const duplicatePhoneNumber = await DoctorsInstance.findOne({
      where: { phoneNumber: req.body.phoneNumber },
    });

    if (duplicatePhoneNumber) {
      return res
        .status(409)
        .json({ msg: "Phone number has been used by another user" });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 8);

    const doctors = {
      id: doctorId,
      DoctorsName: req.body.DoctorsName,
      email: req.body.email,
      specialization: req.body.specialization,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      password: passwordHash,
    };

    const record = await DoctorsInstance.create(doctors);

    // return res
    //   .status(200)
    //   .json({ msg: "You have successfully created a user", record });
    res.redirect('/')
  } catch (err) {
    console.log(req.body)
    res.status(500).json({
      msg: "Failed to create user",
      route: "/register",
    });
  }
}

export async function LoginDoctor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const doctorId = UUID4();

  try {
    const validateResult = loginSchema.validate(req.body, options);
    if (validateResult.error) {
      return res
        .status(400)
        .json({ Error: validateResult.error.details[0].message });
    }

    const doctor = await DoctorsInstance.findOne({
      where: { email: req.body.email },
    }) as unknown as { [key: string]: string };

    // console.log(Doctor);

    const {id} = doctor;
    // console.log(id);

    console.log("before");
    const token = generateToken({ id });
    console.log("after");

    console.log(token);

    const validUser = await bcrypt.compare(req.body.password, doctor.password);
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
      })
      res.status(200).json({
        msg: "Login Successfully",
        token,
        doctor,
      });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      msg: "Failed to login",
      route: "/login",
    });
  }
}

// GET all Todo list
export async function getDoctor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;

    // const record = await TodoInstance.findAll({ where: {}, limit });
    const record = await DoctorsInstance.findAndCountAll({
      limit,
      offset,
      include: [{ model: patientInstance, as: "Patients" }],
    });
    res.status(200).json({
      msg: "You have successfully fetch all Doctors",
      count: record.count,
      record: record.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Failed to fetch all Doctors",
      route: "/read",
    });
  }
}
