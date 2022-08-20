import express, { Request, Response, NextFunction } from "express";
import { string } from "joi";
import jwt from "jsonwebtoken";
import { DoctorsInstance } from "../model/doctorModel";

const secret = process.env.JWT_SECRET as string;

export async function auth(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.header.authorization
    if (!req.cookies.token) {
      // res.status(401).json({
      //   Error: "Kindly sign in as a Doctor",
      // });
      res.redirect('/login')
      return
    }
    const token = authorization?.slice(7, authorization?.length) as string || req.cookies.token

    let verified = jwt.verify(token, secret);

    if (!verified) {
      return res
        .status(401)
        .json({ Error: "Doctor not verify, you can access this route" });
    }

    const { id } = verified as { [key: string]: string };

    const user = await DoctorsInstance.findOne({ where: {id} });

    if (!user) {
      return res.status(404).json({ Error: "Doctor not verified" });
    }

    req.user = verified;
    next();
  } catch (error) {
    console.log(error)
    res.status(403).json({ Error: "Doctor is not not logged in" });
  }
}
