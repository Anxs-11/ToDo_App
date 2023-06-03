import jwt from "jsonwebtoken";
export const sendcookie = (user, res, message, statuscode = 200) => {
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    res.status(statuscode).cookie("token", token, {
        httponly: true,
        maxAge: 15 * 60 * 1000,//15min.
        sameSite: process.env.NODE_ENV = "Developement" ? "lax" : "none",
        secure: process.env.NODE_ENV = "Developement" ? false : true,


    }).json({
        success: true,
        message,
    })
}