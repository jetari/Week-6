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
exports.deleteReport = exports.editReport = exports.getReportDetails = exports.getAllReports = exports.CreateReport = void 0;
const report_1 = __importDefault(require("../model/report"));
//Create Report Function
const CreateReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newReport = req.body;
        const createdReport = yield report_1.default.create(newReport);
        res.status(201).send(createdReport);
    }
    catch (error) {
        console.error("Error creating report", error);
        res.status(500).json({ message: "cant create report" });
    }
});
exports.CreateReport = CreateReport;
//Get all Reports Function
const getAllReports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allReports = yield report_1.default.findAll();
        if (allReports) {
            res.status(200).json(allReports);
        }
        else {
            res.status(200).json(allReports);
        }
    }
    catch (error) {
        console.error("Error getting all reports", error);
        res.status(500).json({ message: "cant get all reports" });
    }
});
exports.getAllReports = getAllReports;
// View details of a single report
const getReportDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reportId = req.params.id;
        const report = yield report_1.default.findOne({ where: { id: reportId } });
        if (!report) {
            res.status(404).json({ message: "Report not found" });
        }
        else {
            res.status(200).json(report);
        }
    }
    catch (error) {
        console.error("Error getting report details", error);
        res.status(500).json({ error: "cant get report details" });
    }
});
exports.getReportDetails = getReportDetails;
// Update report details
const editReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reportId = parseInt(req.params.id, 10);
        const updatedReport = yield report_1.default.findOne({ where: { id: reportId } });
        if (updatedReport) {
            updatedReport.patientsName = req.body.patientsName;
            updatedReport.Age = req.body.Age;
            updatedReport.hospitalName = req.body.hospitalName;
            updatedReport.weight = req.body.weight;
            updatedReport.height = req.body.height;
            updatedReport.bloodGroup = req.body.bloodGroup;
            updatedReport.genotype = req.body.genotype;
            updatedReport.bloodPressure = req.body.bloodPressure;
            updatedReport.HIV_status = req.body.HIV_status;
            updatedReport.hepatitis = req.body.hepatitis;
        }
        yield (updatedReport === null || updatedReport === void 0 ? void 0 : updatedReport.save());
        res.send(updatedReport);
    }
    catch (error) {
        console.error("Error updating report", error);
        res.status(500).json({ error: "Error updating report" });
    }
});
exports.editReport = editReport;
// Delete report
const deleteReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reportId = parseInt(req.params.id, 10);
        const reportToDelete = yield report_1.default.findByPk(reportId);
        if (!reportToDelete) {
            res.status(404).json({ message: "Report not found" });
        }
        else {
            yield reportToDelete.destroy();
            res.status(204).send({ reportToDelete });
        }
    }
    catch (error) {
        console.error("Error deleting report", error);
        res.status(500).json({ error: "Cant delete report" });
    }
});
exports.deleteReport = deleteReport;
