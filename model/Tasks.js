const Sequalize = require('sequelize');
const db = require('../config/db');
const Projects = require('./Projects');

const Tasks = db.define('tasks',{
    id:{
        type: Sequalize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    task: Sequalize.STRING(100),
    status: Sequalize.INTEGER(1),
    
})

Tasks.belongsTo(Projects);

module.exports = Tasks;