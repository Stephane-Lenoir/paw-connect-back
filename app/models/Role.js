import { Model,DataTypes } from "sequelize";
import { sequelize } from "sequelize";

export class Role extends Model { }

Role.init ({
    name:{
        type:DataTypes.STRING,
        allowNull: false,
    }
},  {
        sequelize,
        tableName: "role"
});