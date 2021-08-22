import * as Sequelize from 'sequelize';
import sequelize from './database';
import { User } from '../models/user';

export type UserRow = Sequelize.Model<Users> & Partial<User>;

export type Users = Sequelize.Model<UserRow, User> &
  User & {
    prototype: Users;
    toJSON(): User;
  };

export const Users = sequelize.define(
  'users',
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    status: Sequelize.STRING,
  },
  { tableName: 'Users', timestamps: true, paranoid: true },
);

Users.prototype.toJSON = function toJSON(): User {
  const { id, name, status, email } = this;
  return { id, name, status, email };
};
