import express from "express";
import { CreateDoctor, getAllDoctors, getDoctorDetails, editDoctor, deleteDoctor, createDoctor, loginDoctor } from "../controller/doctor";


import {
  createReport,
  getReport,
  updateReport,
  deleReport,
} from "../controller/doctor";
const router = express.Router();

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// create doctor
// router.post("/", CreateDoctor);
router.post("/reg", createDoctor);
router.post("/login", loginDoctor);

// get all doctors
// router.get("/", getAllDoctors);
router.get("/", getAllDoctors);

// get doctor details
router.get("/:id", getDoctorDetails);

// update doctor details
router.put("/:id", editDoctor);

// delete doctor
router.delete("/:id", deleteDoctor);





//create doctors report
router.post("/report", createReport);

//get patient report
router.get("report", getReport);

//update patient report
router.put("/:id", updateReport);

//delete patient report
router.delete("/:id", deleReport);

export default router;
