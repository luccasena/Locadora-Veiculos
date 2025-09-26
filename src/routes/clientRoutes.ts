import { Router } from "express";
import { 
  GetAllClient, 
  GetClientByID, 
  UpdateClient, 
  CreateClient, 
  DeleteClient 
} from "../controllers/clientController";

const router = Router();

router.get("/:id",GetClientByID );
router.get("/",GetAllClient );
router.post("/",CreateClient );
router.delete("/:id",DeleteClient );
router.put("/:id",UpdateClient );

export default router;
