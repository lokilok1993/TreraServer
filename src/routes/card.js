const {Router} = require('express');
const router = Router();
const {Column, Card} = require('../database/orm');
const checkAuth = require('../middleware/check_auth')


router.get('/:columnId', checkAuth, async (req, res) => {
    const column = await Column.findByPk(req.params.columnId);
    const cards = await column.getCards();
    res.json(cards)
})

router.post('/', checkAuth,
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

        res.json({message: "Карточка создана", card});
    }
);

module.exports = router;



