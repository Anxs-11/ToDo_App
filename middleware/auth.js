import { usermodel } from "../model/users.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(404).json({
            success: false,
            message: "Log In First",
        })
    }
    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = await usermodel.findById(decoded._id);
    next();
}