const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');


/** Configure
 **************/
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(cors());


/** Routers
**************/
const auth = require('./src/routes/auth');
const projects = require('./src/routes/projects');

app.use('/auth', auth);
app.use('/projects', projects);


/** !!! CUSTOM SYNC DEV PURPOSES !!! **/
app.get('/syncBase', async (req, res) => {
    const { orm } = require('./src/database/orm');
    await orm.sync({ force: true });
    res.send('synced');
});


app.listen(PORT,  () => {
    console.log(`Blast-off on http://localhost:${PORT} pid:${process.pid}`);
});