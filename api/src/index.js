require('./connectToDB')

const express = require('express')
const ordersRouter = require('./routes/orders')
const productsRouter = require('./routes/products')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

/* Endpoint to /orders */
app.use('/orders', ordersRouter)

/* Endpoint to /products */
app.use('/products', productsRouter)

app.get('/', (req, res) => {
  res.json({ todo: 'ok' })
})

const port = process.env.PORT || 3001
app.listen(port, () => { console.log(`App running on port ${port}`) })
