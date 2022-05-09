const { Schema, model } = require('mongoose')

const variantSchema = new Schema({
  head: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
}, { _id: false })

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  variants: [variantSchema],
  defs: {
    type: [String],
    default: ['unidad', 'unidades'],
    validate: v => v.length === 2
  },
  reviews: {
    type: Array,
    default: []
  }
})

productSchema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id
    delete retObj._id
    delete retObj.__v
  }
})

module.exports = model('Product', productSchema)
