import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.config";
import Doctor from "./doctor";



class Report extends Model {
  public patientsName!: string;
  public Age!: number;
  public hospitalName!: string;
  public weight!: string;
  public height!: string;
  public bloodGroup!: string;
  public genotype!: string;
  public bloodPressure!: string;
  public HIV_status!: string;
  public hepatitis!: string;
  public doctorId!: string;
}

Report.init(
  {
    patientsName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Age: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    hospitalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.STRING,
    },
    bloodGroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genotype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bloodPressure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HIV_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hepatitis: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    sequelize,
    modelName: "Report",
  }
);
Report.belongsTo(Doctor, {foreignKey: 'doctorId'});

export default Report;