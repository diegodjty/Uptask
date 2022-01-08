const Projects = require('../model/Projects')


exports.projectsHome = async (req, res)=>{
    const projects = await Projects.findAll();

    res.render('index',{
        pageName: 'Projects',
        projects
    });
}

exports.projectForm = async(req, res)=>{
    const projects = await Projects.findAll();
    res.render('newProject',{
        pageName: 'New Project',
        projects
    })
}

exports.newProject = async (req, res)=>{
    const projects = await Projects.findAll();
    // Send to console what user types
    
    // Validate to have something in the input
    const {name} = req.body;

    let errors = [];

    if(!name){
        errors.push({'text':'Add a name to project'})
    }

    // if errors
    if(errors.length > 0){
        res.render('newProject',{
            pageName: 'New Project',
            errors,
            projects
        })
    }else{

        
        const project = await Projects.create({name});
        res.redirect('/')
    }
}

exports.projectsByURL = async (req, res, next)=>{
    const projectsPromise =  Projects.findAll();

    const projectPromise =  Projects.findOne({
        where:{
            url: req.params.url
        }
    })
    
const [projects, project] = await Promise.all([projectsPromise,projectPromise])
    
    if(!project) return next()

    // render view
    res.render('tasks',{
        pageName: 'Project Tasks',
        projects,
        project
    })
}

exports.editForm = async(req,res)=>{
    const projectsPromise =  Projects.findAll();

    const projectPromise =  Projects.findOne({
        where:{
            id: req.params.id
        }
    })
    
    const [projects, project] = await Promise.all([projectsPromise,projectPromise])

    res.render('newProject',{
        pageName: 'Edit Project',
        projects,
        project
    })
}

exports.updateProject = async (req, res)=>{
    const projects = await Projects.findAll();
    // Send to console what user types
    
    // Validate to have something in the input
    const {name} = req.body;

    let errors = [];

    if(!name){
        errors.push({'text':'Add a name to project'})
    }

    // if errors
    if(errors.length > 0){
        res.render('newProject',{
            pageName: 'New Project',
            errors,
            projects
        })
    }else{
        await Projects.update(
            {name: name},
            {where:{id: req.params.id}}
        );
        res.redirect('/')
    }
}

exports.deleteProject = async (req, res, nex)=>{
    const {urlProject} = req.query;

    const result = await Projects.destroy({where:{
        url:urlProject
    }})

    if(!result){
        return next();
    }

    res.status(200).send('Project Deleted')
}