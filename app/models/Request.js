import { sequelize } from "../database.js";
import { Model, DataTypes } from "sequelize";

export class Request extends Model {}

Request.init(
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "request",
  }
);
