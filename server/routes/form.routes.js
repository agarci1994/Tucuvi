// Express
const express = require('express');
const formRoutes = express.Router();

// Services
const createTask = require('../services/createTaskAPIHandler')
const getTask = require('../services/getTaskAPIHandler')

 formRoutes.post('/create', (req, res, next) => {
   const object = req.body
    createTask(object).then(() => console.log("Your Task is Send 💌")).catch(err => next(err))
 });

 formRoutes.get('/receive', (req, res, next) => {
   getTask()
     .then(response => res.json(response))
     .catch(err => console.log(err))
  })

module.exports = formRoutes;