import { Model, Optional, DataTypes, Sequelize } from 'sequelize';

interface LocationAttributes {
  id: number;
  name: string;
}
interface LocationCreationAttributes extends Optional<LocationAttributes, 'id'>{}

export class Location extends Model<LocationAttributes, LocationCreationAttributes> implements LocationAttributes {
  id!: number;
  name!: string;

  // timestamps!
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
};

export function initLocations(sequelize: Sequelize) {
  Location.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
    }
  }, { sequelize, modelName: 'location' });
}