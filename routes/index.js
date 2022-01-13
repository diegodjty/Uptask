const express = require('express');
const router = express.Router();
const {body} = require('express-validator/check')

// import controller
const projectsController = require('../controllers/projectsController.js');
const tasksController = require('../controllers/tasksController.js');
const usersController = require('../controllers/usersController.js');
const authController = require('../controllers/authController.js');

module.exports = function(){
    // route for home
    router.get('/',
        authController.authenticateUser,
        projectsController.projectsHome
    );
    router.get('/new-project',
        authController.authenticateUser,
        projectsController.projectForm
    );
    router.post('/new-project',
        authController.authenticateUser,
        body('name').not().isEmpty().trim().escape(),
        projectsController.newProject
    );

    // List projects
    router.get('/projects/:url',
        authController.authenticateUser,
        projectsController.projectsByURL
    )
    
    // Update project
    router.get('/projects/edit/:id',
        authController.authenticateUser,
        projectsController.editForm
    )
    router.post('/new-project/:id',
        authController.authenticateUser,
        body('name').not().isEmpty().trim().escape(),
        projectsController.updateProject
    );

    router.delete('/projects/:url',
        authController.authenticateUser,
        projectsController.deleteProject
    )


    // Tasks
    router.post('/projects/:url',
        authController.authenticateUser,
        tasksController.addTask
    )

    // Update task
    router.patch('/tasks/:id',
        authController.authenticateUser,
        tasksController.updateTaskStatus
    )

    // Delete task
    router.delete('/tasks/:id',
        authController.authenticateUser,
        tasksController.deleteTask
    )

    // Create new Accout

    router.get('/create-account',usersController.createAcctForm)
    router.post('/create-account',usersController.createAcct)
    router.get('/confirm/:email',usersController.confirmAccount)

    // Login

    router.get('/login',usersController.loginForm)
    router.post('/login',authController.authUser)
    
    // Logout
    router.get('/logout',authController.logout)

    // restablish password
    router.get('/reestablish', usersController.reestablishPassword)
    router.post('/reestablish', authController.sendToken)
    router.get('/reestablish/:token', authController.validateToken)
    router.post('/reestablish/:token', authController.updatePassword)


    return router
}