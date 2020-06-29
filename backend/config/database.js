const Sequelize = require('sequelize')
const db = {}
const database = require('../models');
const sequelize = new Sequelize("groupomania", "postgres", "admin", {
    host: "localhost",
    dialect: "postgresql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
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

module.exports = db