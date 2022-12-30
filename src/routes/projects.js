const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const { Project, User } = require('../database/orm');
const { validateRules, validate } = require('../validation/project_validator');
const checkAuth = require('../middleware/check_auth')

router.get('/', async (req, res) => {
    const { token } = req.body;
    const user = await User.findByPk(jwt.decode(token).id);
    const userProjects = await user.getProjects();
    res.json(userProjects)
})

router.post('/', checkAuth, validateRules(), validate,
    async (req, res) => {
        const { name, token } = req.body;
        const user = await User.findByPk(jwt.decode(token).id);
        const project = await Project.create({name})
        project.addUser(user);
    }
);

module.exports = router;