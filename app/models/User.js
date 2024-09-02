import { sequelize } from "../database.js";
import { Model, DataTypes } from "sequelize";

export class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "user",
  }
);
