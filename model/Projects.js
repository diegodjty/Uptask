const Sequalize = require('sequelize');
const db = require('../config/db');
const slug  = require('slug');
const shortid = require('shortid');

const Projects = db.define('projects',{
    id: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
     name: Sequalize.STRING,
     url: Sequalize.STRING
}, {
    hooks: {
        beforeCreate(project){
            const url = slug(project.name).toLowerCase();

            
            project.url = `${url}=${shortid.generate()}`
        }
    }
});

module.exports = Projects;