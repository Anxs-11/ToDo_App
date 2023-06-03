import express from "express";

import { register, login, getMyProfile, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const Router = express.Router();


Router.post("/new", register);
Router.post("/login", login);
Router.get("/logout", logout);

Router.get("/me", isAuthenticated, getMyProfile);

export default Router