const {sequelize, Sequelize} = require('./index');
const bcrypt = require('bcryptjs');
const Model = Sequelize.Model;

class User extends Model {}

User.init({
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
    experience: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    points: {
        type: Sequelize.DOUBLE,
        allowNull: true,
    },
    // passwordResetToken: {
    //     type: Sequelize.STRING,
    // },
    // passwordResetExpires: {
    //     type: Sequelize.DATE
    // }
}, {sequelize})


// User.sync({ force: true })

module.exports = User;