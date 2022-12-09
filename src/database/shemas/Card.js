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
    creator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    worker_id: {
        type: DataTypes.INTEGER,
    }
};
