// place order cod:/api/order/cod

import Order from "../models/Order.js";
import Product from "../models/Product.js";


// PLACE ORDER COD
export const placeOrderCOD = async (req, res) => {
  try {

    const userId = req.user._id; 
    const { items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.json({ success: false, message: "Invalid Data" });
    }

    // calculate amount using items
    let amount = await items.reduce(async (acc, item) => {

      const product = await Product.findById(item.product);

      return (await acc) + product.offerPrice * item.quantity;

    }, 0);

    // add tax (2%)
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
    });

    res.json({
      success: true,
      message: "Order Placed Successfully"
    });

  } catch (error) {

    console.log(error.message);

    res.json({
      success: false,
      message: error.message
    });

  }
};




export const getUserOrder = async (req, res) => {
  try {

    const userId = req.user._id; 

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });

  } catch (error) {

    console.log(error.message);

    res.json({
      success: false,
      message: error.message
    });

  }
};



// GET ALL ORDERS (ADMIN / SELLER)
export const getAllOrder = async (req, res) => {
  try {

    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders
    });

  } catch (error) {

    console.log(error.message);

    res.json({
      success: false,
      message: error.message
    });

  }
};