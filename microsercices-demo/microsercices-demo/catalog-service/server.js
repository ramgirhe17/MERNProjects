const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// connect to the mongo db
// url: mongodb://<server ip address>:<port>/<db name>
mongoose.connect('mongodb://localhost:27017/catalog_service_db')

const app = express()

app.use(cors('*'))
app.use(express.json())

// add the route
const catalogRouter = require('./routes/catalog')
app.use('/catalog', catalogRouter)

app.listen(4001, '0.0.0.0', () => {
  console.log('catalog service started successfully port 4001')
})
