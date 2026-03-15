
import User from "../models/user.js";


//POST /api/cart/update
 
 
export const updateCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    const userId = req.user._id;
    const { cartItems } = req.body;

    if (!cartItems || typeof cartItems !== "object") {
      return res.status(400).json({ success: false, message: "Invalid cart data" });
    }

    await User.findByIdAndUpdate(userId, { cartItems });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.error("Cart update server error:", error);
    res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
};