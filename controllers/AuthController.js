const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Admin = require('../db/admin');
// const mailer = require('../modules/mailer');
const router = express.Router();
const authConfig = require('../config/auth.json');

const generateToken = (id, secret, expiresSeconds) => {
    let token = jwt.sign({ id }, secret, {
        expiresIn: parseInt(expiresSeconds)
    })
    return token
}

router.post('/register', async (req, res) => {
    const { email } = req.body
    try {

        await Admin.findOne({
            where: {
                email: email
            }
        }).then(admin => {
            if (admin) {
                return res.status(400).send({ error: 'Admin already exists' });
            }
        }).catch( err => {
            return res.status(400).send({ error: 'find one failed', consoleError: err })
        } )

        await Admin.create(req.body).then((administrator) => {
            console.log('oi')
            administrator.setDataValue('password', undefined)
            // administrator.setDataValue('passwordResetToken', undefined)
            // administrator.setDataValue('passwordResetExpires', undefined)
            return res.json({ administrator, token: generateToken(administrator.get('id'), authConfig["admin-secret"], 1800) })
        
        }).catch((err) => err);


    } catch ( err ) {
        return res.status(400).send({ error: 'registration failed', consoleError: err })
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    await Admin.findOne({
        where: {
            email: email
        }
    }).then((administrator) => {
        if (administrator) {
            var pass = administrator.get('password');
            if (!bcrypt.compareSync(password, pass)) {

                return res.status(400).send({ error: 'Invalid password' })

            } else {

                administrator.setDataValue('password', undefined)
                administrator.setDataValue('passwordResetToken', undefined)
                administrator.setDataValue('passwordResetExpires', undefined)

                res.send({ administrator, token: generateToken(administrator.get('id'), authConfig["admin-secret"], 1800) });

            }
        } else {
            return res.status(400).send({ error: 'Admin not found' })
        }
    });
})

// router.post('/forgot_password', async (req, res) => {
//     const { email } = req.body;

//     try {

//         await Admin.findOne({
//             where: {
//                 email: email
//             }
//         }).then( async (administrator) => {
//             if (administrator) {

//                 const token = crypto.randomBytes(20).toString('hex');

//                 const now = new Date();
//                 now.setHours(now.getHours() + 1);

//                 await administrator.set('passwordResetToken', token).save()
//                 await administrator.set('passwordResetExpires', now).save()

//                 mailer.sendMail({
//                     to: email,
//                     from: 'arthurgfcardozo@gmail.com',
//                     template: 'auth/forgot_password',
//                     context: { token }
//                 }, (err) => {
//                     if (err) {
//                         return res.status(400).send({ error: 'Cannot send forgot password email'})
//                     }
//                     return res.send();
//                 })

//             } else {
                
//                 return res.status(400).send({ error: 'Admin not found' })
            
//             }
//         });

//     } catch (err) {
//         res.status(400).send({ error: 'Error on forgot password, try again'})
//     }

// })

// router.post('/reset_password', async (req, res) => {

//     const {email, token, password} = req.body;

//     try {

//         await Admin.findOne({
//             where: {
//                 email: email
//             }
//         }).then( async (administrator) => {
//             if (administrator) {

//                 if (token !== administrator.get('passwordResetToken')) {
//                     return res.status(401).send({ error: 'Token invalid' });
//                 }

//                 const now = new Date()

//                 if (now > administrator.get('passwordResetExpires')) {
//                     return res.status(400).send({ error: 'Token expired, generate a new one' });
//                 }

//                 await administrator.set('password', password).save();

//                 res.send();

//             } else {

//                 return res.status(400).send({ error: 'Admin not found' })

//             }
//         });

//     } catch (error) {
//         return res.status(400).send({ error: 'Cannot reset password, try again' })
//     }
// })

module.exports = router;