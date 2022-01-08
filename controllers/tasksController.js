const Projects = require('../model/Projects');
const Tasks = require('../model/Tasks');

exports.addTask = async (req, res, next)=>{

    // Get actual project
    const project = await Projects.findOne({where:{url:req.params.url}});
    
    // get input value
    const {task} = req.body;

    const status = 0;
    const projectId = project.id
    
    //insert to DB
    const result = await Tasks.create({task, status, projectId})

    if(!result){
        return next();
    }

    res.redirect(`/projects/${req.params.url}`)
}

exports.updateTaskStatus = async (req,res, next)=>{
    const {id} = req.params;
    const task = await Tasks.findOne({
        where:{id}
    })

    let status = 0;
    if(!task){
        return next()
    }else{
        if(task.status === status){
            status = 1;
        }
        task.status = status;
    }
    const result = await task.save()

    if(!result) return next();
    
    res.send('works')
}

exports.deleteTask = async (req, res, next) =>{

    const {id} = req.params;

    // delete task
    const result = await Tasks.destroy({
        where: {id}
    })

    if(!result){
        return next();
    }

    res.status(200).send('deleting');

}