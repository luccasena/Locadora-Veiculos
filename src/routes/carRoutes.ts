import express from "express";
import carsController from "../controllers/carController";

const router = express.Router();
 
router.get("/:id", carsController.getCarsId);
router.get("/", carsController.getCars);
router.post("/", carsController.createCar);
router.delete("/:id", carsController.deleteCar);
router.put("/:id", carsController.update);

export default router