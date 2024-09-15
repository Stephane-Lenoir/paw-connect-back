import { sequelize } from "../database.js";
import { Model, DataTypes } from "sequelize";

export class Donation extends Model {}

Donation.init(
  {
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    donorName: {  // Changé de donor_name à donorName
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    donorEmail: {  // Changé de donor_email à donorEmail
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'pending',
    },
    userId: {  // Changé de user_id à userId
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: "donation",
    tableName: "donation",
    underscored: true,  // Ceci transformera automatiquement camelCase en snake_case pour la base de données
  }
);