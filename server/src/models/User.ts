import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class User extends Model { /*...*/ }

User.init({
  id: { /* UUID primary key */ },
  username: { /* required string */ },
}, { sequelize, modelName: 'User' });

export default User;
