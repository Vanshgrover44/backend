import { Router } from "express";
import { registeruser } from "../controller/user.controller.js";

const router = Router();


router.route("/register").post(registeruser)  // this will redirect to register page of user 

export default router;
