const Express = require('express');
const router = Express.Router();

router.get('/', (req, res) => {
    res.send({message: 'welcome on API_v1'})
});

router.use('/admin', require('./admin'))
router.use('/user', require('./user'))

module.exports = router;