import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import Doctor from "../model/doctor";
import Report from "../model/report";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ParamsDictionary } from "express-serve-static-core";


//generate Access Token function

function generateAccessToken(doctor: Doctor) {
  const payload = {
    email: doctor.email,
    id: doctor.id,
  };
  const secret = "Your_secret_key";
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secret, options);
}

interface AccessTokenPayload extends jwt.JwtPayload {
  email: string;
  id: string;
};

function verifyAccessToken(token: string) {
  const secret: string = "Your_secret_key";

  try {
    const decoded = jwt.verify(token, secret) as AccessTokenPayload;
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, data: (error as Error).message };
  }
}

function authenticateToken(req:Request, res:Response, next:NextFunction) {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
    return;
  }

  const token = authHeader.substring("Bearer ".length);
  if(!token){
    res.status(401).json({message: "Missing token"});
    return;
  }

  const verificationResponse = verifyAccessToken(token);

  if (verificationResponse.success) {
    res.locals.verificationResponse = verificationResponse;
    res.locals.doctor = verificationResponse.data; // Store doctor data in res.locals
    next();
  } else {
    res.status(401).json({ message: "Invalid token" });
  }
}


//Create Doctor Function
export const CreateDoctor = async (req: Request, res: Response ) => {
    try{
        const newDoctor: Doctor = req.body;
        const createdDoctor = await Doctor.create(newDoctor as Partial<Doctor>);
        res.status(201).send(createdDoctor);
    }catch(error){
        console.error("Error creating doctor", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const allDoctors = await Doctor.findAll();

    if (allDoctors) {
      res.status(200).json(allDoctors);
    } else {
      res.status(404).json({ message: "No doctors found" });
    }
  } catch (error) {
    console.error("Error getting all doctors", error);
    res
      .status(500)
      .json({ message: "Internal server error" });
  }
};

// View details of a single doctor
export const getDoctorDetails = async (req: Request, res: Response ) => {

        const doctorId = req.params.id;
        const doctor = await Doctor.findOne({where: {id: doctorId}});
        
        if(!doctor){
            res.status(404).json({message: "Doctors Data not found"});
        } else {
            res.status(200).json(doctor);
        }
    
};

// Update doctor details
export const editDoctor = async (req: Request, res: Response ) => {

    const doctorId = req.params.id;
    const doctor = await Doctor.findOne({where: {id: doctorId}});

    if (doctor) {
        doctor.doctorsName = req.body.doctorsName;
        doctor.email = req.body.email;
        doctor.password = req.body.password;
        doctor.specialization = req.body.specialization;
        doctor.gender = req.body.gender;
        doctor.phonenumber = req.body.phonenumber;
    }
    await doctor?.save();
    res.send(doctor);  
};

// Delete a doctor
export const deleteDoctor = async (req: Request, res: Response ) => {

  const doctorId = req.params.id;
    const deleteRows = await Doctor.findOne({ where: { id: doctorId } });

    if (!deleteRows) {
      res.status(404).json({ message: "Doctor not found" });
    } else {
      await deleteRows.destroy();
    }
    res.status(204).send({ message: "Doctor deleted successfully" });
};


// Used to hash the password using bcrypt
export const createDoctor = async (req: Request, res: Response) => {
  const doctor = await Doctor.create(req.body);
  const password = req.body.password;
  const hashpassword = bcrypt.hashSync(password, 10);
  doctor.password = hashpassword;
  await doctor.save();
  res.send(doctor);  
};

// used for authentication
export const loginDoctor = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).send({ message: "Email or password missing" });
  }
  const doctor = await Doctor.findOne({ where: { email: email } });

  if (!doctor) {
    return res.status(404).send({ message: "Email does not Exist" });
  }

  const Match = bcrypt.compareSync(password, doctor.password);

  if (!Match) {
    return res.status(404).send({ message: "Invalid Password" });
  }

  const accessToken = generateAccessToken(doctor);

  res.status(200).send({ message: "Login Successful", accessToken: accessToken });
};

// export const loginDoctor = async(req: Request, res: Response, doctor: Doctor) => {
//   const accessToken = generateAccessToken(doctor);
//   // Store the token securely, for example, using cookies
//   res.cookie("access_token", accessToken, { httpOnly: true });
//   res.status(200).json({ message: "Doctor logged in successfully" });
// }

// import { Request, Response } from "express";
// import Report from "../models/report"; // Import your Report model

// Function to create a report
async function createReport(req: Request, res: Response) {
  try {
    const doctor = res.locals.doctor as AccessTokenPayload;
    const reportData = req.body;

    // Attach doctor's ID to the report
    reportData.doctorId = doctor.id;

    // Create the report in the database
    const createdReport = await Report.create(reportData);

    res
      .status(201)
      .json({ message: "Report created successfully", report: createdReport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Function to retrieve a report
async function getReport(req: Request, res: Response) {
  try {
    const doctor = res.locals.doctor as AccessTokenPayload;
    const reportId = req.params.reportId;

    // Retrieve the report from the database
    const report = await Report.findByPk(reportId);

    // Check if the report exists and if the doctor's ID matches the one attached to the report
    if (!report || report.doctorId !== doctor.id) {
      res.status(404).json({ message: "Report not found or unauthorized" });
      return;
    }

    res.status(200).json({ message: "Report retrieved successfully", report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Function to update a report
async function updateReport(req: Request, res: Response) {
  try {
    const doctor = res.locals.doctor as AccessTokenPayload;
    const reportId = req.params.reportId;
    const updatedData = req.body;

    // Retrieve the report from the database
    const report = await Report.findByPk(reportId);

    // Check if the report exists and if the doctor's ID matches the one attached to the report
    if (!report || report.doctorId !== doctor.id) {
      res.status(404).json({ message: "Report not found or unauthorized" });
      return;
    }

    // Update the report
    await report.update(updatedData);

    res.status(200).json({ message: "Report updated successfully", report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Function to delete a report
async function deleReport(req: Request, res: Response) {
  try {
    const doctor = res.locals.doctor as AccessTokenPayload;
    const reportId = req.params.reportId;

    // Retrieve the report from the database
    const report = await Report.findByPk(reportId);

    // Check if the report exists and if the doctor's ID matches the one attached to the report
    if (!report || report.doctorId !== doctor.id) {
      res.status(404).json({ message: "Report not found or unauthorized" });
      return;
    }

    // Delete the report
    await report.destroy();

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { createReport, getReport, updateReport, deleReport };
