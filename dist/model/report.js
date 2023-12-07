"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const doctor_1 = __importDefault(require("./doctor"));
class Report extends sequelize_1.Model {
}
Report.init({
    patientsName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Age: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    hospitalName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    weight: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    height: {
        type: sequelize_1.DataTypes.STRING,
    },
    bloodGroup: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    genotype: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    bloodPressure: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    HIV_status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    hepatitis: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_config_1.default,
    modelName: "Report",
});
Report.belongsTo(doctor_1.default, { foreignKey: 'doctorId' });
exports.default = Report;
