const {sequelize, Sequelize} = require('./index');
const Model = Sequelize.Model;

class Report extends Model {}
 
Report.init({
    createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    lastOwner: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    details: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    propertyNumber: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    reportStatus: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    propertyStreet: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    propertyArea: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    propertyPostcode: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    detailUnmodernised: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    detailDerelict: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    detailEmpty: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    detailVandalised: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    detailIllegalEntrance: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    detailOvergrownGarden: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    detailClosed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    detailOwnerNotPresent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    // , propertySnapshot: {
    //     type: Sequelize.BOOLEAN,
    //     allowNull: true,
    // },
}, {sequelize})

//Report.hasOne(Housing)
// Report.sync({ force: true })

module.exports = Report