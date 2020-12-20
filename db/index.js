const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://bbphuvxyaqpvvk:327fdfbeac4b8ce67c8dc37ff447e992bb1408304ec1dd1a0261ecf2014ea5ab@ec2-100-25-231-126.compute-1.amazonaws.com:5432/dfug8jfed1it6i');

module.exports = {Sequelize, sequelize}