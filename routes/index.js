const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check')

// import controller
const projectsController = require('../controllers/projectsController.js');

module.exports = function(){
    // route for home
    router.get('/',projectsController.projectsHome);
    router.get('/new-project',projectsController.projectForm);
    router.post('/new-project',
        body('name').not().isEmpty().trim().escape(),
        projectsController.newProject
    );

    // List projects
    router.get('/projects/:url', projectsController.projectsByURL)
    
    // Update project
    router.get('/projects/edit/:id',projectsController.editForm)
    router.post('/new-project/:id',
        body('name').not().isEmpty().trim().escape(),
        projectsController.updateProject
    );

    router.delete('/projects/:url', projectsController.deleteProject)

    return router
}