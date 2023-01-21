const { Router } = require('express');
const router = Router();
const { Project, Column } = require('../database/orm');
const { validateRules, validate } = require('../validation/project_validator');
const checkAuth = require('../middleware/check_auth')



router.get('/get-project-columns/:projectId', checkAuth, async (req, res) => {
        const project = await Project.findByPk(req.params.projectId);
        const columns = await project.getColumns();
        res.json(columns)
})

router.post('/create-column', checkAuth, validateRules(), validate,
    async (req, res) => {
        const { name, position, project_id } = req.body;
        const project = await Project.findByPk(project_id);
        const column = await Column.create({name, position});
        await project.addColumn(column);

        res.json({message: "Колонка создана", column});
    }
);


router.delete('delete-column/:columnId', checkAuth, async (req, res) => {
        const column = await Column.findByPk(req.params.columnId);
        const deleted = column.destroy();

        if(deleted)
                res.json({message: 'Колонка удалена', id: req.params.cardId})
        res.json({message: 'Ошибка'})

})

module.exports = router;