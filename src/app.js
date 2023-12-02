const express = require('express');
const Router = require('./router.js');
app = express();
app.use(express.json());
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use("/", Router);

module.exports = app;