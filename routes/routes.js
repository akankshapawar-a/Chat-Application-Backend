import express from "express";
import { Signup, login, logout } from "../controllers/User.js";
import { getMessages, sendMessage ,getUserForSidebar} from "../controllers/Message.js";
import protectRoute from '../middleware/protectRoute.js'
const userRouter=express.Router();

userRouter.post("/signup",Signup);
userRouter.post("/login",login);
userRouter.post("/logout",logout);


userRouter.get("/:id", protectRoute, getMessages);
userRouter.post('/send/:id',protectRoute,sendMessage);


userRouter.get('/',protectRoute,getUserForSidebar);
export default userRouter;