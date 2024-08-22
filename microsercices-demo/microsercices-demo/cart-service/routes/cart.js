const express = require('express')
const cryptoJS = require('crypto-js')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.post('/', (request, response) => {
  const { userId, productId, title, price, quantity } = request.body
  const query = `insert into cart (userId, productId, productTitle, price, quantity) values (?, ?, ?, ?, ?)`
  db.pool.execute(
    query,
    [userId, productId, title, price, quantity],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

router.get('/:userId', (request, response) => {
  const { userId } = request.params

  const query = `select id, productId, productTitle, price, quantity from cart where userId = ?`
  db.pool.execute(query, [userId], (error, cartItems) => {
    response.send(utils.createResult(error, cartItems))
  })
})

module.exports = router
