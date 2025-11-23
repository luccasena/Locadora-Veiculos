import { Router } from "express";
import loginControllers from "../controllers/loginController";

const router = Router();
 
router.post("/", loginControllers.login);
router.post("/logout", loginControllers.logout);

export default router