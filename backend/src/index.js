require('dotenv').config();
const cors = require('cors');
const express = require('express');
const sequelize = require('./db.js');
const router = require('./router/router.js');
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;


app.use('/static', express.static(path.resolve(__dirname, 'static')));
app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(port, () => {
      console.log(`SERVER STARTED ON PORT: ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

start();








