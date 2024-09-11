const { string } = require('joi');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true},
  name: {type: String, required: false},
  price: {type: Number, required: true},
  images: [{ img: {type: String, required: true}}],
  description: { type: String, required: true},
  featured: { type: Boolean, default: false},
  topSelling: { type: Boolean, default: false},
  location:{type:String, required:true},
  utilities:{type: String, required:true},
  size: {type:String, required:true}
}, {timestamps: true}) 

module.exports = mongoose.model("Product", productSchema);