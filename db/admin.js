const {sequelize, Sequelize} = require('./index');
const bcrypt = require('bcryptjs');
const Model = Sequelize.Model;

class Admin extends Model {}

Admin.init({
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        set(val) {
            const hash = bcrypt.hashSync(val, 10);
            this.setDataValue('password', hash);
        }
    },
    // passwordResetToken: {
    //     type: Sequelize.STRING,
    // },
    // passwordResetExpires: {
    //     type: Sequelize.DATE
    // }
}, {sequelize})


// Admin.sync({ force: true })

module.exports = Admin