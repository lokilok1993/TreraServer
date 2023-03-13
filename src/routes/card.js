const {Router} = require('express');
const router = Router();
const {Column, Card} = require('../database/orm');
const checkAuth = require('../middleware/check_auth')


router.get('/get-column-cards/:columnId', checkAuth, async (req, res) => {
    const column = await Column.findByPk(req.params.columnId);
    const cards = await column.getCards();
    res.json(cards)
})

router.post('/create-card', checkAuth,
    async (req, res) => {
        const {
            name,
            summery,
            description,
            column_id,
        } = req.body;
        const column = await Column.findByPk(column_id);

        const card = await Card.create({
            name,
            summery,
            description,
            creator_id: req.userData.id,
            worker_id: req.userData.id,
            column_id,
        })
        await column.addCard(card)

        res.json({message: "Карточка создана", card: {...card.dataValues, ColumnId: column_id} });
    }
);

router.post('/update-card', checkAuth,
    async (req, res) => {
        const {
            name,
            summery,
            description,
            priority,
            id,
            ColumnId,
        } = req.body;

        const card = await Card.findByPk(id);

        if(!card){
            res.json({message: 'Карточка не найдена'})
            return
        }

        await card.update({
            name: name || card.name,
            summery: summery || card.summery,
            description: description || card.description,
            priority: priority || card.priority,
            id: id || card.id,
            ColumnId: ColumnId || card.ColumnId
        })

        res.json({message: "Карточка обновлена", card});
    }
);

router.delete('/delete-card/:cardId', checkAuth, async (req, res) => {
    const card = await Card.findByPk(req.params.cardId);
    const deleted = card.destroy();

    if(deleted){
        res.json({message: 'Карточка удалена', id: req.params.cardId})
    }else{
        res.json({message: 'Ошибка'})
    }
})

module.exports = router;



