const Express = require('express');
const router = Express.Router();

const Report = require('../../../db/Report');

router.use(require('../../../middlewares/authUser'));

router.get('/', (req, res) => {
    res.send({message: 'welcome on API_v1 user'});
});

router.post('/reports', (req,res) => {
    Report.create(req.body).then(report => {
        res.send(report);
    }).catch(err => res.status(500));
});

module.exports = router