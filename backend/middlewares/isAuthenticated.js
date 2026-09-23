import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      })
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false
      });
    }

    req.id = user._id;
    req.user = user;

    next();
  }
  catch (error) {
    console.error("Authentication error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Session expired. Please log in again.",
        success: false
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid authentication token",
        success: false
      });
    }

    return res.status(401).json({
      message: "Authentication failed",
      success: false
    });

  }
}

export default isAuthenticated;