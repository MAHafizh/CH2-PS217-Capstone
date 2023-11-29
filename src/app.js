const express = require('express');
const Router = require('./router.js');

app = express();

app.use("/", Router);

module.exports = app;