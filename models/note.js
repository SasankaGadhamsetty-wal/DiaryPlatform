const db = require("../models/index");
const { DataTypes } = require("sequelize");
const User = require("./user");
console.log("inside models");
const Note = db.sequelize.define(
  "notes",
  {
    note_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Note.belongsTo(User, { foreignKey: "email" });
module.exports = Note;
