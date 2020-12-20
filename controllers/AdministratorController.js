const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middlewares/auth');
const Admin = require('../db/admin');
const router = express.Router();
router.use(authMiddleware);
const authConfig = require('../config/auth.json');

router.get('/', (req,res) => {
    let adminId = req.body.adminId
    
    res.send({ok: true, adminId})
})

module.exports = app => app.use('/admin', router);