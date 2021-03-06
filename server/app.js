// Enviroment variables
require('dotenv').config();

// Database connection
require('./configs/mongoose.config')

//Google config
require('./configs/google.config')

// Application instance
const express = require('express')
const app = express()
      
// Configs
require('./configs/middleware.config')(app)
require('./configs/locals.config')(app)
require('./configs/session.config')(app)


// Base URLS
app.use('/api/form', require('./routes/form.routes'))
      

module.exports = app;
