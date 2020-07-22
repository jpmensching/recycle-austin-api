"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUsers = exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
;
function initUsers(sequelize) {
    User.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        }
    }, { sequelize, modelName: 'user' });
}
exports.initUsers = initUsers;
