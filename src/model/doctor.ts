import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.config";
import { v4 as uuidv4 } from "uuid";


class Doctor extends Model {
  public email!: string;
  public doctorsName!: string;
  public specialization!: string;
  public gender!: string;
  public phonenumber!: string;
  public password!: string;
  public id!: string;

  
}

Doctor.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    doctorsName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Doctor",
  }
);

export default Doctor;