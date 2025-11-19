import { Router } from "express";
import loginControllers from "../controllers/loginController";

const router = Router();
 
router.post("/", loginControllers.login);

export default router