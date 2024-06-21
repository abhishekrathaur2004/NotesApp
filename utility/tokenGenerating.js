import jwt from "jsonwebtoken";
import User from "../models/user.js";

const generateToken = async (email) => {
  try {
    if (!email) {
      return null;
    }
    const payload = await User.findOne({ email });

    const token = jwt.sign(
      {
        id: payload._id,
        email: payload.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return token;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in generating token",
    });
  }
};

export { generateToken};
