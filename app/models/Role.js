import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database.js";

export class Role extends Model {}

Role.init(
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "role",
  }
);
