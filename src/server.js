const express = require('express');
const http = require('http');
const app = require('./app.js');
const PORT = 5000;

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`)
});