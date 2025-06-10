import { Model as SequelizeModel, DataTypes } from "sequelize";
import sequelize from "./sequelize.js"; 

class Lyrics extends SequelizeModel {}

// Initialize the Lyrics model with the required schema
Lyrics.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Lyrics",
    tableName: "Lyrics",
    timestamps: true,
  }
);

export default Lyrics;
