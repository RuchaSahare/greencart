

import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authUser = async (req, res, next) => {
  try {

    const { token } = req.cookies; 
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

   
    req.user = user;

    
    req.userId = user._id;

    next();

  } catch (error) {

    console.error("authUser error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Authentication failed: " + error.message
    });

  }
};

export default authUser;