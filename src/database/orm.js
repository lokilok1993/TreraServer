const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();

const modOpt = {underscored: true}


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
const User = orm.define('User', UserSchema, modOpt);
const Project = orm.define('Project', ProjectSchema, modOpt);
const Column = orm.define('Column', ColumnSchema, modOpt);
const Card = orm.define('Card', CardSchema, modOpt);


/** Relations
 ****************************/
User.belongsToMany(Project, {through: 'ProjectsUsers'})
Project.belongsToMany(User, {through: 'ProjectsUsers'})

Project.hasMany(Column);
Column.belongsTo(Project);

Column.hasMany(Card);
Card.belongsTo(Column);


module.exports = {
    orm,
    User,
    Project,
    Column,
    Card,
}