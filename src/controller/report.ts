import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import Report from '../model/report';

//Create Report Function
export const CreateReport = async (req: Request, res: Response ) => {
    try{
        const newReport: Report = req.body;
        const createdReport = await Report.create(newReport as Partial<Report>);
        res.status(201).send(createdReport);

      } catch(error) {
        console.error("Error creating report", error);
        res.status(500).json({message: "cant create report"});
    }
};

//Get all Reports Function
export const getAllReports = async (req: Request, res: Response ) => {
    try{
        const allReports = await Report.findAll();

        if(allReports) {
            res.status(200).json(allReports);
        } else {
        res.status(200).json(allReports);
        }
    }catch(error){
        console.error("Error getting all reports", error);
        res.status(500).json({message: "cant get all reports"});
    }
};

// View details of a single report
export const getReportDetails = async (req: Request, res: Response ) => {
    try{
        const reportId = req.params.id;
        const report = await Report.findOne({ where: { id: reportId } });
        
        if(!report){
            res.status(404).json({message: "Report not found"});
        } else {
            res.status(200).json(report);
        }
    } catch(error){
        console.error("Error getting report details", error);
        res.status(500).json({error: "cant get report details"});
    }
};

// Update report details
export const editReport = async (req: Request, res: Response ) => {
    try{
        const reportId = parseInt(req.params.id, 10);
        const updatedReport = await Report.findOne({ where: { id: reportId } });

        if(updatedReport) {
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
        await updatedReport?.save();
        res.send(updatedReport);
    }catch(error){
        console.error("Error updating report", error);
        res.status(500).json({error: "Error updating report"});
    }
};

// Delete report
export const deleteReport = async (req: Request, res: Response ) => {
    try{
        const reportId = parseInt(req.params.id, 10);
        const reportToDelete = await Report.findByPk(reportId);

        if(!reportToDelete){
            res.status(404).json({message: "Report not found"});
        } else {
            await reportToDelete.destroy();
            res.status(204).send({reportToDelete});
        }
    }catch(error){
        console.error("Error deleting report", error);
        res.status(500).json({error: "Cant delete report"});
    }
};