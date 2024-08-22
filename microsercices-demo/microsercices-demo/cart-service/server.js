const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors('*'))
app.use(express.json())

// add the route
const cartRouter = require('./routes/cart')
app.use('/cart', cartRouter)

app.listen(4002, '0.0.0.0', () => {
  console.log('cart service started successfully port 4002')
})
