const inquirer = require('inquirer');
const PORT = 3001;
const express = require('express');
const app = express();
const db = require('../db/connection')



// Middleware
app.use(express.static());
app.use(express.json());
app.use(express.urlencoded());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});