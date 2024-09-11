 const mongoose = require("mongoose");



 const orderSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  phone: { type: String, required: true},
  address: {type: String, required: true},
  email: { type: String , required:true},
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
      quantity: {type: Number},
    }
  ],
  amount: {type: Number, required: true},
  transactionId: { type: String, required: true},
  status: {type: String, default: "Pending"},
  date: {type: Date, default: Date.now()}
 })

 module.exports = mongoose.model("Order", orderSchema);