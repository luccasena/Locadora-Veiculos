import { Router } from "express";
import contractController from "../controllers/contractController";

const router = Router();

router.get("/", contractController.getContracts);
router.get("/:id", contractController.getContractById);
router.post("/", contractController.createContract);
router.delete("/:id", contractController.deleteContract);
router.put("/:id", contractController.updateContract);

export default router;