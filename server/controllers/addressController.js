

import Address from "../models/Address.js";



export const addAddress = async (req, res) => {
  try {

    const userId = req.user._id; 
    const { address } = req.body;

    if (!userId) {
      return res.json({
        success: false,
        message: "User not authenticated"
      });
    }

    const newAddress = await Address.create({
      ...address,
      userId
    });

    res.json({
      success: true,
      message: "Address added successfully",
      address: newAddress
    });

  } catch (error) {

    console.log(error.message);

    res.json({
      success: false,
      message: error.message
    });

  }
};

export const getAddress = async (req, res) => {
  try {

    const userId = req.user._id; 

    if (!userId) {
      return res.json({
        success: false,
        message: "User not authenticated"
      });
    }

    const addresses = await Address.find({ userId });

    res.json({
      success: true,
      addresses
    });

  } catch (error) {

    console.log(error.message);

    res.json({
      success: false,
      message: error.message
    });

  }
};