"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctor_1 = require("../controller/doctor");
const doctor_2 = require("../controller/doctor");
const router = express_1.default.Router();
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// create doctor
// router.post("/", CreateDoctor);
router.post("/reg", doctor_1.createDoctor);
router.post("/login", doctor_1.loginDoctor);
// get all doctors
// router.get("/", getAllDoctors);
router.get("/", doctor_1.getAllDoctors);
// get doctor details
router.get("/:id", doctor_1.getDoctorDetails);
// update doctor details
router.put("/:id", doctor_1.editDoctor);
// delete doctor
router.delete("/:id", doctor_1.deleteDoctor);
//create doctors report
router.post("/report", doctor_2.createReport);
//get patient report
router.get("report", doctor_2.getReport);
//update patient report
router.put("/:id", doctor_2.updateReport);
//delete patient report
router.delete("/:id", doctor_2.deleReport);
exports.default = router;
