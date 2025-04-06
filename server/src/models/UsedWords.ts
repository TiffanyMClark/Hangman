import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class UsedWord extends Model { /*...*/ }

UsedWord.init({
  id: { /* UUID */ },
  word: { type: DataTypes.STRING, unique: true, allowNull: false },
  userId: { type: DataTypes.UUID, allowNull: false },
}, { sequelize, modelName: 'UsedWord' });

export default UsedWord;
