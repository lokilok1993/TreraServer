const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();


/** Sequelize db connection
 ****************************/
const orm = new Sequelize(`postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:5432/trera`);


/** Schemas
 ****************************/
const UserSchema = require('./shemas/User')
const ProjectSchema = require('./shemas/Project')
const ColumnSchema = require('./shemas/Column')
const CardSchema = require('./shemas/Card')


/** Models
 ****************************/
const User = orm.define('User', UserSchema);
const Project = orm.define('Project', ProjectSchema);
const Column = orm.define('Column', ColumnSchema);
const Card = orm.define('Card', CardSchema);


/** Relations
 ****************************/
User.belongsToMany(Project, {through: 'ProjectsUsers'})
Project.belongsToMany(User, {through: 'ProjectsUsers'})
Column.belongsTo(Project)
Card.belongsTo(Column)


module.exports = {
    orm,
    User,
    Project,
    Column,
    Card,
}