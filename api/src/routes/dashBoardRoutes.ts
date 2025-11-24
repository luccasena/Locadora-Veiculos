import { Router } from "express";
import dashBoardControllers from "../controllers/dashBoardController";

const router = Router();
 
router.get("/", dashBoardControllers.getDashboardData);

export default router