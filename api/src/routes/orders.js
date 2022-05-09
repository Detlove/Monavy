const router = require('express').Router()
const orderSchema = require('../models/orderSchema')
/* const productSchema = require('../models/productSchema') */

/* Get all orders */
router.get('/', async (req, res, next) => {
  try {
    const orders = await orderSchema.find().populate('cart.product', {
      _id: 0
    })
    res.json(orders)
  } catch (error) { next(error) }
})

/* GET one order */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const orders = await orderSchema.findById(id)/* .populate('product') */
    res.json(orders)
  } catch (error) { next(error) }
})

/* Create New Order */
router.post('/', async (req, res, next) => {
  /* const cart = req.body?.cart || []

  const subTotals = await Promise.all(
    cart.map(async item => {
      const product = await productSchema.findById(item.product)
      return item.qty * product.price
    })
  )

  const totalPrice = subTotals.reduce((a, b) => a + b, 0) */

  const bodyOrder = orderSchema(req.body)

  bodyOrder.save()
    .then(savedOrder => res.json(savedOrder))
    .catch(next)
})

/* Edit a order */
router.put('/:id', (req, res, next) => {
  const { id } = req.params
  orderSchema.findByIdAndUpdate(id, req.body, { new: true })
    .then(changedOrder => res.json(changedOrder))
    .catch(next)
})

/* Delete a order */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params
  orderSchema.findByIdAndRemove(id)
    .then(() => res.status(204).end())
    .catch(next)
})

/* Handle error */
router.use((err, req, res, next) => {
  console.log(err)
  res.status(400).json({ message: err.message })
})

module.exports = router
