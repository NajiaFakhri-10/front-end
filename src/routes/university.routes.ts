import { Router } from "express";
import {
  getUniversities,
  createUniversity,
  getUniversityById,
  updateUniversity,
  deleteUniversity,
} from "../controllers/university.controller";

const router = Router();

router.get("/", getUniversities);
router.post("/", createUniversity);
router.get("/:id", getUniversityById);
router.put("/:id", updateUniversity);
router.delete("/:id", deleteUniversity);

export default router;
