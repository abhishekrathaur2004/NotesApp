import bcrypt from 'bcrypt'
import User from '../models/user.js';

const hashingPassword = async (password) => {
  if (!password) return false;

  try {
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.toString(),saltRounds);
   
    return hashedPassword;
  } catch (err) {
      console.log(err)
    throw new Error("Error while hashing password");
  }
};
const checkPassword = async(email, password)=>{
  
  if(!email || !password){
    return false;
  }
  try {
    const userExists = await User.findOne({email});
    if(!userExists){
      return {
        success : false,
        msg : "User not found"
      }
    }
    
    const passwordMatch = await bcrypt.compare(password.toString(),userExists.password);
    if(passwordMatch){
      return {
        success : true,
      }
    }
    else{
      return {
        success : false,
        msg : "Password does not match"
      }
    }

  } catch (error) {
    console.log(error);
  }
}
export {hashingPassword,checkPassword};

