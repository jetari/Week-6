import express from "express";
import { CreateReport, getAllReports, getReportDetails, editReport, deleteReport } from "../controller/report";
const router = express.Router();



// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });

// create report
router.post("/", CreateReport);

// get all reports
router.get("/", getAllReports);

// get report details
router.get("/:id", getReportDetails);

// update report details
router.put("/:id", editReport);

// delete report
router.delete("/:id", deleteReport);


export default router;
