const { Schema, model } = require('mongoose')

const counterSchema = new Schema(
  {
    _id: { type: String, required: true },
    seq: { type: Number, default: 1 }
  }
)

counterSchema.index({ _id: 1, seq: 1 }, { unique: true })

const counterModel = model('counter', counterSchema)

const invoiceN = function (modelName, doc, next) {
  counterModel.findByIdAndUpdate( // ** Method call begins **
    modelName, // The ID to find for in counters model
    { $inc: { seq: 1 } }, // The update
    { new: true, upsert: true }, // The options
    function (error, counter) { // The callback
      if (error) return next(error)

      doc.invoiceNumber = counter.seq
      next()
    }
  ) // ** Method call ends **
}

module.exports = invoiceN
