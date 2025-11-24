import { Router } from "express";
import clientController from "../controllers/clientController";

const router = Router();

router.get("/:id", clientController.getClientById);
router.get("/", clientController.GetAllClient);
router.post("/", clientController.CreateClient);
router.delete("/:id", clientController.DeleteClient);
router.put("/:id", clientController.UpdateClient);

export default router;
