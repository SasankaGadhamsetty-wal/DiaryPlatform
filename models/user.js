const db = require("../models/index");
const { DataTypes } = require("sequelize");
console.log("inside models");
const User=db.sequelize.define(
    "users",
    {
        name:{
            type:DataTypes.TEXT,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        mobile_no: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email:{
            type:DataTypes.TEXT,
            allowNull: false,
            primaryKey: true,
        },
        password:{
            type:DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);


module.exports = User;