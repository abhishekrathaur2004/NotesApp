import express from "express";
import { loginController, signupController } from "../controllers/authControllers.js";
const Router = express.Router();

Router.post("/login", loginController);
Router.post("/register",signupController);

Router.get("/login",(req,res)=>{
    const token = req.cookies.token;
    if(token){
        return res.redirect('/api/v1/notes');
    }
    return res.render("auth/login");
})
Router.get("/logout" ,(req,res)=>{

    const token = req.cookies.token;
    if(!token){
     
        return res.redirect('/api/v1/notes');
    }
    try {
        res.clearCookie('token');
        return res.json({
            ok:true
        });
    } catch (error) {
        return res.json({
            ok:false
        });
    }
})
Router.get("/register",(req,res)=>{
    const token = req.cookies.token;
    if(token){
        return res.redirect('/api/v1/notes');
    }
    
    return res.render("auth/register");
})

export default Router;
