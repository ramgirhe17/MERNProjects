const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
})

// the collection will be created with name: products
module.exports = mongoose.model('product', productSchema)
