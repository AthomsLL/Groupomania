require('dotenv').config();
const Sequelize = require('sequelize')
const db = {}
const database = require('../models');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "postgresql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false, 
    sync: true,
    define: { 
      freezeTableName: true 
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

database.sequelize
  .authenticate()
  .then(() => {
    console.log('Nice ! This seems to work just fine');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.database = database

module.exports = db