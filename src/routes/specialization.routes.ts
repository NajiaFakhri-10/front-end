import { Router } from "express";
import {
  getSpecializations,
  createSpecialization,
  getSpecializationById,
  updateSpecialization,
  deleteSpecialization,
} from "../controllers/specialization.controller";

const router = Router();

router.get("/", getSpecializations);
router.post("/", createSpecialization);
router.get("/:id", getSpecializationById);
router.put("/:id", updateSpecialization);
router.delete("/:id", deleteSpecialization);

export default router;
