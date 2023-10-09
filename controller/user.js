import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import {sendCookie} from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const registerUser = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;

        let user = await User.findOne({email});

        if(user) 
            return next(new ErrorHandler("User already exists", 400));

        const hashedPassword = await bcrypt.hash(password,10);

        user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const message = "User Created Successfully";

        sendCookie(user,res,message,201);
    } catch (error) {
        next(error);
    }
}

export const getMyProfile = (req, res) => {
    
    res.json({
        success:true,
        user:req.user
    });
};

export const authenticateUser = async (req,res,next)=> {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email}).select("+password");

        if(!user)
            return next(new ErrorHandler("Invalid Email or Password", 400));

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch)
            return next(new ErrorHandler("Invalid Email or Password", 400));

        const message = `Welcome aboard, ${user.name}`;

        sendCookie(user, res, message, 200);

    } catch (error) {
        next(error);
    }
};

export const logout = (req, res) => {
    res
        .status(200)
        .cookie("token","", {
            expires:new Date(Date.now()),
            sameSite: process.env.NODE_ENV === 'dev'? "lax": "none",
            secure: process.env.NODE_ENV === 'dev' ? false: true      
        })
        .json({
            success:true,
            message:"User Logout Successfully"
        });
}
