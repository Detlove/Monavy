const { Schema, model } = require('mongoose')
const idvalidator = require('mongoose-id-validator')

const getInvoiceN = require('./invoiceN')

const itemCartSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  qty: {
    type: Number,
    required: true
  },
  variant: Number
}, { _id: false })

const buyerSchema = Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  }
}, { _id: false })

const orderSchema = new Schema({
  invoiceNumber: Number,
  status: {
    type: String,
    default: 'draft'
  },
  buyer: {
    type: buyerSchema,
    required: [true, 'buyer validation failed']
  },
  cart: {
    type: [itemCartSchema],
    validate: v => v.length > 0
  },
  totalPrice: Number
}, { timestamps: true })

orderSchema.pre('save', function (next) {
  if (!this.isNew) {
    next()
    return
  }

  console.log('Nuevo pedido!!!!')

  getInvoiceN('orders', this, next)
})

orderSchema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id
    delete retObj._id
    delete retObj.__v
  }
})

orderSchema.index({ _id: 1, invoiceNumber: 1 })

orderSchema.plugin(idvalidator)

module.exports = model('order', orderSchema)
