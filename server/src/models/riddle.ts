import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";

interface RiddleAttributes {
  id?: number;
  question: string;
  answer: string;
}

interface RiddleCreationAttributes extends Optional<RiddleAttributes, "id"> {}

class Riddle
  extends Model<RiddleAttributes, RiddleCreationAttributes>
  implements RiddleAttributes
{
  public id!: number;
  public question!: string;
  public answer!: string;
}

Riddle.init(
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "riddles",
    timestamps: true,
  }
);

export default Riddle;
