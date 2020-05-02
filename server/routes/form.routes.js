const express = require('express');
const formRoutes = express.Router();
const createTask = require('../services/createTaskAPIHandler')

 formRoutes.post('/create', (req, res) => {

   const object = req.body
    createTask(object).then(elm => console.log(elm)).catch(err => console.log(err))

    res.status(202).send('📫 Your Task is Send 💌');
 });

module.exports = formRoutes;