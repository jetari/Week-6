"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleReport = exports.updateReport = exports.getReport = exports.createReport = exports.loginDoctor = exports.createDoctor = exports.deleteDoctor = exports.editDoctor = exports.getDoctorDetails = exports.getAllDoctors = exports.CreateDoctor = void 0;
const doctor_1 = __importDefault(require("../model/doctor"));
const report_1 = __importDefault(require("../model/report"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//generate Access Token function
function generateAccessToken(doctor) {
    const payload = {
        email: doctor.email,
        id: doctor.id,
    };
    const secret = "Your_secret_key";
    const options = { expiresIn: "1h" };
    return jsonwebtoken_1.default.sign(payload, secret, options);
}
;
function verifyAccessToken(token) {
    const secret = "Your_secret_key";
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        return { success: true, data: decoded };
    }
    catch (error) {
        return { success: false, data: error.message };
    }
}
function authenticateToken(req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res
            .status(401)
            .json({ message: "Missing or invalid Authorization header" });
        return;
    }
    const token = authHeader.substring("Bearer ".length);
    if (!token) {
        res.status(401).json({ message: "Missing token" });
        return;
    }
    const verificationResponse = verifyAccessToken(token);
    if (verificationResponse.success) {
        res.locals.verificationResponse = verificationResponse;
        res.locals.doctor = verificationResponse.data; // Store doctor data in res.locals
        next();
    }
    else {
        res.status(401).json({ message: "Invalid token" });
    }
}
//Create Doctor Function
const CreateDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDoctor = req.body;
        const createdDoctor = yield doctor_1.default.create(newDoctor);
        res.status(201).send(createdDoctor);
    }
    catch (error) {
        console.error("Error creating doctor", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.CreateDoctor = CreateDoctor;
const getAllDoctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allDoctors = yield doctor_1.default.findAll();
        if (allDoctors) {
            res.status(200).json(allDoctors);
        }
        else {
            res.status(404).json({ message: "No doctors found" });
        }
    }
    catch (error) {
        console.error("Error getting all doctors", error);
        res
            .status(500)
            .json({ message: "Internal server error" });
    }
});
exports.getAllDoctors = getAllDoctors;
// View details of a single doctor
const getDoctorDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.params.id;
    const doctor = yield doctor_1.default.findOne({ where: { id: doctorId } });
    if (!doctor) {
        res.status(404).json({ message: "Doctors Data not found" });
    }
    else {
        res.status(200).json(doctor);
    }
});
exports.getDoctorDetails = getDoctorDetails;
// Update doctor details
const editDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.params.id;
    const doctor = yield doctor_1.default.findOne({ where: { id: doctorId } });
    if (doctor) {
        doctor.doctorsName = req.body.doctorsName;
        doctor.email = req.body.email;
        doctor.password = req.body.password;
        doctor.specialization = req.body.specialization;
        doctor.gender = req.body.gender;
        doctor.phonenumber = req.body.phonenumber;
    }
    yield (doctor === null || doctor === void 0 ? void 0 : doctor.save());
    res.send(doctor);
});
exports.editDoctor = editDoctor;
// Delete a doctor
const deleteDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.params.id;
    const deleteRows = yield doctor_1.default.findOne({ where: { id: doctorId } });
    if (!deleteRows) {
        res.status(404).json({ message: "Doctor not found" });
    }
    else {
        yield deleteRows.destroy();
    }
    res.status(204).send({ message: "Doctor deleted successfully" });
});
exports.deleteDoctor = deleteDoctor;
// Used to hash the password using bcrypt
const createDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctor = yield doctor_1.default.create(req.body);
    const password = req.body.password;
    const hashpassword = bcrypt_1.default.hashSync(password, 10);
    doctor.password = hashpassword;
    yield doctor.save();
    res.send(doctor);
});
exports.createDoctor = createDoctor;
// used for authentication
const loginDoctor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).send({ message: "Email or password missing" });
    }
    const doctor = yield doctor_1.default.findOne({ where: { email: email } });
    if (!doctor) {
        return res.status(404).send({ message: "Email does not Exist" });
    }
    const Match = bcrypt_1.default.compareSync(password, doctor.password);
    if (!Match) {
        return res.status(404).send({ message: "Invalid Password" });
    }
    const accessToken = generateAccessToken(doctor);
    res.status(200).send({ message: "Login Successful", accessToken: accessToken });
});
exports.loginDoctor = loginDoctor;
// export const loginDoctor = async(req: Request, res: Response, doctor: Doctor) => {
//   const accessToken = generateAccessToken(doctor);
//   // Store the token securely, for example, using cookies
//   res.cookie("access_token", accessToken, { httpOnly: true });
//   res.status(200).json({ message: "Doctor logged in successfully" });
// }
// import { Request, Response } from "express";
// import Report from "../models/report"; // Import your Report model
// Function to create a report
function createReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctor = res.locals.doctor;
            const reportData = req.body;
            // Attach doctor's ID to the report
            reportData.doctorId = doctor.id;
            // Create the report in the database
            const createdReport = yield report_1.default.create(reportData);
            res
                .status(201)
                .json({ message: "Report created successfully", report: createdReport });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
exports.createReport = createReport;
// Function to retrieve a report
function getReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctor = res.locals.doctor;
            const reportId = req.params.reportId;
            // Retrieve the report from the database
            const report = yield report_1.default.findByPk(reportId);
            // Check if the report exists and if the doctor's ID matches the one attached to the report
            if (!report || report.doctorId !== doctor.id) {
                res.status(404).json({ message: "Report not found or unauthorized" });
                return;
            }
            res.status(200).json({ message: "Report retrieved successfully", report });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
exports.getReport = getReport;
// Function to update a report
function updateReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctor = res.locals.doctor;
            const reportId = req.params.reportId;
            const updatedData = req.body;
            // Retrieve the report from the database
            const report = yield report_1.default.findByPk(reportId);
            // Check if the report exists and if the doctor's ID matches the one attached to the report
            if (!report || report.doctorId !== doctor.id) {
                res.status(404).json({ message: "Report not found or unauthorized" });
                return;
            }
            // Update the report
            yield report.update(updatedData);
            res.status(200).json({ message: "Report updated successfully", report });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
exports.updateReport = updateReport;
// Function to delete a report
function deleReport(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const doctor = res.locals.doctor;
            const reportId = req.params.reportId;
            // Retrieve the report from the database
            const report = yield report_1.default.findByPk(reportId);
            // Check if the report exists and if the doctor's ID matches the one attached to the report
            if (!report || report.doctorId !== doctor.id) {
                res.status(404).json({ message: "Report not found or unauthorized" });
                return;
            }
            // Delete the report
            yield report.destroy();
            res.status(200).json({ message: "Report deleted successfully" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
exports.deleReport = deleReport;
