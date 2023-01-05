const { Router } = require('express');
const router = Router();
const { Project, User } = require('../database/orm');
const { validateRules, validate } = require('../validation/project_validator');
const checkAuth = require('../middleware/check_auth')

router.get('/', checkAuth, async (req, res) => {
    const user = await User.findByPk(req.userData.id);
    const userProjects = await user.getProjects();
    res.json(userProjects)
})

router.post('/', checkAuth, validateRules(), validate,
    async (req, res) => {
        const { name } = req.body;
        const user = await User.findByPk(req.userData.id);
        const project = await Project.create({name, creator_id: req.userData.id})
        project.addUser(user);

        res.json({message: "Проект создан"});
    }
);

router.delete('/', checkAuth, async (req, res) => {
    const { project_id } = req.body;
    const project = await Project.findByPk(project_id);
    if(project.creator_id !== req.userData.id){
        res.json({message: "Проект может удалять только создатель"});
        return;
    }

    const isDeleted = await project?.destroy();
    if(isDeleted){
        res.json({message: "Проект удалён"})
    }
})

module.exports = router;