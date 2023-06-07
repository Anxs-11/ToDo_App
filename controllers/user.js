import { usermodel } from "../model/users.js";
import bcrypt from "bcrypt";
import { sendcookie } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await usermodel.findOne({ email }).select("+password");
        if (!user) return next(new ErrorHandler("Invalid Email or Password", 400))

        const ismatch = await bcrypt.compare(password, user.password);
        if (!ismatch) return next(new ErrorHandler("Invalid Email or Password", 400))

        sendcookie(user, res, `Welcome Back, ${user.name}`, 200);
    } catch (error) {
        next(error)
    }
};
export const register = async (req, res,next) => {
    try {
        const { name, email, password } = req.body;
        let user = await usermodel.findOne({ email });
        if (user) return next(new ErrorHandler("User Already Registered", 400))

        const haspass = await bcrypt.hash(password, 10);

        user = await usermodel.create({
            name,
            email,
            password: haspass,
        })

        sendcookie(user, res, "Registered Succesfully", 201);
    } catch (error) {
        next(error)
    }
};

export const getMyProfile = (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    })
};

export const logout = (req, res) => {
    return res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV == "Developement" ? "lax" : "none",
        secure: process.env.NODE_ENV == "Developement" ? false : true,

    }).json({
        success: true,

    })
};



