import { Model,DataTypes } from "sequelize";
import { sequelize } from "sequelize";

export class Role extends Model { }

Role.init (
    {
        name:{
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    },  
    {
        sequelize,
        tableName: "role"
    }
);