require('dotenv').config()
const mongoose = require('mongoose')

/* Connect to Database */
mongoose.connect(process.env.DATABASE_URI)
  .then(console.log('Base de datos conectada'))
  .catch(console.error)
