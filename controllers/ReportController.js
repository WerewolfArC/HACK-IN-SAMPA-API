const express = require('express');

const Report = require('../db/report');
const router = express.Router();

router.get('/report/:id', async function (req,res) {
    res.send(await Report.findById(req.params.id))
});

router.post('/report/add', async (req, res) => {
    try {
        await Report.create(req.body).then((rep) => {
            console.log('report cadastrado')
            return res.json({ rep })
        }).catch((err) => err);

    } catch ( err ) {
        return res.status(400).send({ error: 'report registration failed', consoleError: err })
    }
});



module.exports = router;