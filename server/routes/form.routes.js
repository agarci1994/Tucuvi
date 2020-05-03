// Express
const express = require('express');
const formRoutes = express.Router();

// Services
const createTask = require('../services/createTaskAPIHandler')

 formRoutes.post('/create', (req, res, next) => {
   const object = req.body
    createTask(object).then(() => console.log("Your Task is Send 💌")).catch(err => next(err))
 });

module.exports = formRoutes;