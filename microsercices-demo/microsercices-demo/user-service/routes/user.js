const express = require('express')
const cryptoJS = require('crypto-js')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

router.post('/signup', (request, response) => {
  const { firstName, lastName, email, password } = request.body

  const encryptedPassword = String(cryptoJS.MD5(password))
  const query = `insert into users (firstName, lastName, email, password) values (?, ?, ?, ?)`
  db.pool.execute(
    query,
    [firstName, lastName, email, encryptedPassword],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

router.post('/signin', (request, response) => {
  const { email, password } = request.body

  const encryptedPassword = String(cryptoJS.MD5(password))
  const query = `select id, firstName, lastName from users where email = ? and password = ?`
  db.pool.execute(query, [email, encryptedPassword], (error, users) => {
    if (error) {
      response.send(utils.createErrorResult(error))
    } else if (users.length == 0) {
      // user does not exist
      response.send(utils.createErrorResult('user does not exist'))
    } else {
      // user with required email and password found
      response.send(utils.createSuccessResult(users[0]))
    }
  })
})

module.exports = router
