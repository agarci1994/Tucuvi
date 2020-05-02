const express = require('express');
const formRoutes = express.Router();
const createTask = require('../services/createTaskAPIHandler')


 formRoutes.post('/create', (req, res) => {

     // Set the task payload to the form submission.
    //  const {
    //      to_name,
    //      from_name,
    //      to_email,
    //      date
    //  } = req.body;

    //  const payload = {
    //      to_name,
    //      from_name,
    //      to_email
    //  };

     createTask().then(elm => console.log(elm)).catch(err => console.log(err))

     res.status(202).send('📫 Your postcard is in the mail! 💌');
 });

module.exports = formRoutes;