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
        const project = await Project.create({name})
        project.addUser(user);

        res.json({message: "Проект создан"});
    }
);

module.exports = router;