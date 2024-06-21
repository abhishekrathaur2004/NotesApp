import jwt from 'jsonwebtoken'
import User from '../models/user.js';

const verifyUser = async(req,res, next)=>{
    
    const token = req.cookies.token;
    // console.log('yeha aaya ',token)
    if(!token){
        return res.redirect('auth/login')
        // return res.status(401).json({
        //     status:false,
        //     ok:false,
        //     message:'Missing token.'
        // });
    }

    jwt.verify(token, process.env.JWT_SECRET, async(err, data)=>{
        if(err){
            // console.log(err);
            return res.status(401).json({
                status:false,
                ok:false,
                message:'Wrong Token'
            });
            
        }
        const user = await User.findOne({email:data.email});
        req.user = user;
        next();
    })
}
export default verifyUser;