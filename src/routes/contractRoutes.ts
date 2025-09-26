import { Router } from "express";
import contractController from "../controllers/contractController";

const router = Router();

router.get("/contracts", contractController.getContracts);
router.get("/contracts/:id", contractController.getContractById);
router.post("/contracts", contractController.createContract);
router.delete("/contracts/:id", contractController.deleteContract);
router.put("/contracts/:id", contractController.updateContract);

export default router;