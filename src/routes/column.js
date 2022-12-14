const { Router } = require('express');
const router = Router();
const { Project, Column } = require('../database/orm');
const { validateRules, validate } = require('../validation/project_validator');
const checkAuth = require('../middleware/check_auth')



router.get('/:projectId', checkAuth, async (req, res) => {
        const project = await Project.findByPk(req.params.projectId);
        const columns = await project.getColumns();
        res.json(columns)
})

router.post('/', checkAuth, validateRules(), validate,
    async (req, res) => {
        const { name, position, project_id } = req.body;
        const project = await Project.findByPk(project_id);
        const column = await Column.create({name, position})
        await project.addColumn(column)

        res.json({message: "Колонка создана", column});
    }
);

module.exports = router;