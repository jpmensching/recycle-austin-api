import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id'>{}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: number;
  username!: string;
  password!: string;

  // timestamps!
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
};

export function initUsers(sequelize: Sequelize) {
  User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { sequelize, modelName: 'user' });
}