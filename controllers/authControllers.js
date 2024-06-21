import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { hashingPassword, checkPassword } from "../utility/passwordHashing.js";
import { generateToken} from "../utility/tokenGenerating.js";

const signupController = async (req, res) => {
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        ok: false,
        error: "Input fields missing",
      });
    }
    const checkUserExisting = await User.findOne({ email });
    // if user found then we have to return user already exist
    if (checkUserExisting) {
   
      // return res.status(400).json({
      //   success: false,
      //   ok: false,
      //   error: "User already exist",
      // });
      return res.render('auth/register',{
        message: 'User already exist'
      })
    }

    // user not found saving it
    const hashedPassword = await hashingPassword(password);
    const newUser = new User({
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    
    // res.status(201).json({
    //   success: true,
    //   ok: true,
    //   message: "User registered successfully!",
    // });
    res.redirect('login')
  } catch (error) {
    // console.log(`Error while Registering : ${error}`);
    res.status(500).json({
      success: false,
      ok: false,
      message: "Error registering user",
      error,
    });
  }
  // console.log('Auth Register Route');
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

    if (!isValidUser) {
      // return res.status(401).json({
      //   success: false,
      //   ok: false,
      //   message: "Wrong email or password",
      // });
      return res.render('auth/login',{
        message : "Wrong email or password",
      })
    }
    const token= await generateToken(email);
    const oneDays = 1 * 24 * 60 * 60 * 1000;
    res.cookie("token", token, { maxAge: oneDays });
    res.redirect('../notes');
  } catch (error) {
    res
      .status(500)
      .json({ success: false, ok: false, message: "Error logging in", error });
  }
};
export { signupController, loginController };
