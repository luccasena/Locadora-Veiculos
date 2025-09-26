import { Router } from "express";
import carsController from "../controllers/carController";

const router = Router();
 
router.get("/", carsController.getCars);
router.get("/:id", carsController.getCarsId);
router.post("/", carsController.createCar);
router.delete("/:id", carsController.deleteCar);
router.put("/:id", carsController.update);

export default router