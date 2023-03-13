const { DataTypes } = require('sequelize');

module.exports = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    summery: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    priority: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    creator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    worker_id: {
        type: DataTypes.INTEGER,
    }
};
