"use strict";
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        firstName: {
            type: sequelize_1.DataTypes.STRING,
        },
        lastName: {
            type: sequelize_1.DataTypes.STRING,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
    }, { timestamps: true });
    return User;
};
