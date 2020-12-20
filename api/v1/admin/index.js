const Express = require('express');
const router = Express.Router();

const Report = require('../../../db/Report');

router.use(require('../../../middlewares/auth'));

router.get('/', (req, res) => {
    res.send({message: 'welcome on API_v1 administrator'});
});

router.get('/reports', (req,res) => {
    Report.findAll().then(reports => {
        if (!reports || reports.length < 1) return res.status(400).send({error: 'No reports in database'});
        res.send((reports));
    }).catch(err => {
        console.log(err)
        res.status(500).send(err);
    });
});

module.exports = router