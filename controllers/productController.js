const Product = require("../models/product");
const {validateProduct} = require("../validators");
const cloudinary = require("../config/cloudinary")
// exports.createProduct = async (req, res) => {
//   try {
//     const {error} = validateProduct(req.body)
//     if (error) {
//       res.json(error.details[0].message);
//     }
//     const images = req.files.map(file => ({ img: file.path }))
//     const product = new Product({
//       category: req.body.category,
//       name: req.body.name,
//       description: req.body.description,
//       images: images,
//       price: req.body.price,
//       topSelling: req.body.topSelling,
//       featured: req.body.featured,
//       location: req.body.location,
//       utilities: req.body.utilities,
//       size: req.body.size
//     })

//     const new_product_data = await product.save();
//     res.json(new_product_data);
//   } catch (error) {
//     console.log({message: error.message});
    
//   }
// }

exports.createProduct = async (req, res) => {
  try {
    const { error } = validateProduct(req.body)
    if (error) {
      res.json(error.details[0].messsage);
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded"});
    }

    const images = [];
    for (const file of req.files ) {
      try {
        const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`);
        images.push({ img: result.secure_url });
      }catch(uploadError) {
        console.log("Image upload error:", uploadError);
        return res.status(500).json({message: "Image upload failed", errror: uploadError.messsage});
      }}
      
      const product = new Product({
        category: req.body.category,
        name: req.body.name,
        description: req.body.description,
        images: images,
        price: req.body.price,
        topSelling: req.body.topSelling,
        featured: req.body.featured,
        location: req.body.location,
        utilities: req.body.utilities,
        size: req.body.size
      })
  
      const new_product_data = await product.save();
      res.json(new_product_data);
    
    // const images = req.files.map(file => ({ imf: file.path}))
   

  } catch (error) {
    console.log({ message: error.message });
    
  }
}

exports.getAllProduct = async (req, res) => {
  const products = await Product.find().populate("category")
  res.json(products)
}