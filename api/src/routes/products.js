const router = require('express').Router()
const productSchema = require('../models/productSchema')

/* Get All Products */
router.get('/', (req, res, next) => {
  productSchema.find()
    .then(allOrders => {
      res.json(allOrders)
    })
    .catch(next)
})
// /* GET one order */
// router.get('/:id', (req, res, next) => {
//   const { id } = req.params
//   orderSchema.findById(id)
//     .then(order => res.json(order))
//     .catch(next)
// })

/* Create New Product */
router.post('/', (req, res, next) => {
  const newProduct = productSchema(req.body)

  newProduct.save()
    .then(savedOrder => res.json(savedOrder))
    .catch(next)
})

/* Edit a Product */
router.put('/:id', (req, res, next) => {
  const { id } = req.params
  orderSchema.findByIdAndUpdate(id, req.body, { new: true })
    .then(changedOrder => res.json(changedOrder))
    .catch(next)
})

// /* Delete a order */
// router.delete('/:id', (req, res, next) => {
//   const { id } = req.params
//   orderSchema.findByIdAndRemove(id)
//     .then(() => res.status(204).end())
//     .catch(next)
// })

/* Handle error */
router.use(({ message }, req, res, next) => {
  res.status(400).json({ message })
})

module.exports = router
