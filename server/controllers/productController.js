import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  try {

    const productData = JSON.parse(req.body.productData);
    const files = req.files;

    if (!files || files.length === 0) {
      return res.json({
        success: false,
        message: "No images uploaded",
      });
    }

    const imagesURL = files.map((file) => file.path);

    await Product.create({
      ...productData,
      image: imagesURL,
    });

    res.json({
      success: true,
      message: "Product Added Successfully",
    });

  } catch (error) {
    console.log("Add Product Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const productList = async (req, res) => {
  try {

    const products = await Product.find({});

    res.json({
      success: true,
      products,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Get single product by ID
export const productById = async (req, res) => {
  try {

    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Change product stock
export const changeStock = async (req, res) => {
  try {

    const { id, inStock } = req.body;

    await Product.findByIdAndUpdate(id, { inStock });

    res.json({
      success: true,
      message: "Stock Updated",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};