const express = require('express')
const utils = require('../utils')
const Product = require('../models/product')

const router = express.Router()

router.get('/', (request, response) => {
  Product.find().exec((error, products) => {
    response.send(utils.createResult(error, products))
  })
})

router.post('/', (request, response) => {
  const { title, description, price } = request.body
  const product = new Product()
  product.title = title
  product.description = description
  product.price = price
  product.save((error, result) => {
    response.send(utils.createResult(error, result))
  })
})

module.exports = router
