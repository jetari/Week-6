"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const report_1 = require("../controller/report");
const router = express_1.default.Router();
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });
// create report
router.post("/", report_1.CreateReport);
// get all reports
router.get("/", report_1.getAllReports);
// get report details
router.get("/:id", report_1.getReportDetails);
// update report details
router.put("/:id", report_1.editReport);
// delete report
router.delete("/:id", report_1.deleteReport);
exports.default = router;
