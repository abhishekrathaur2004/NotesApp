import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { hashingPassword, checkPassword } from "../utility/passwordHashing.js";
import { generateToken } from "../utility/tokenGenerating.js";

const signupController = async (req, res) => {
  try {
    const { email, password ,cnfpassword} = req.body;
  
    if (!email || !password || !cnfpassword) {
      return res.status(400).json({
        success: false,
        ok: false,
        error: "Input fields missing",
      });
    }
    //checking if password and confirm password is not same.
    if(password !== cnfpassword){
      return res.render("auth/register", {
        message: "Password and Confirm Password is not same",
      });
    }

    const checkUserExisting = await User.findOne({ email });
    // if user found then we have to return user already exist
    if (checkUserExisting) {
      
      return res.render("auth/register", {
        message: "User already exist",
      });
    }

    
    // user not found saving it
    const hashedPassword = await hashingPassword(password);
    const newUser = new User({
      email: email,
      password: hashedPassword,
    });
    await newUser.save();


    res.redirect("login");
  } catch (error) {

    res.status(500).json({
      success: false,
      ok: false,
      message: "Error registering user",
      error,
    });
  }

};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        ok: false,
        error: "Input fields missing",
      });
    }
    const isValidUser = await checkPassword(email, password);
    
    // if user is not registerd or password is wrong
    if (!isValidUser.success) {
      
      return res.render("auth/login", {
        message: isValidUser.msg,
      });
    }

  
    // creating token for one hour

    const token = await generateToken(email);
    const oneHour = 1* 60 * 60 * 1000;
    res.cookie("token", token, { maxAge: oneHour });
    res.redirect("../notes");
  } catch (error) {
    res
      .status(500)
      .json({ success: false, ok: false, message: "Error logging in", error });
  }
};
export { signupController, loginController };
