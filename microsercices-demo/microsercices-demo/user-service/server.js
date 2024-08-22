const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors('*'))
app.use(express.json())

// add the route
const userRouter = require('./routes/user')
app.use('/user', userRouter)

app.listen(4000, '0.0.0.0', () => {
  console.log('user service started successfully port 4000')
})
