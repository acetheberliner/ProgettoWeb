import { Router } from "express";
import * as categorieController from "../controllers/categories-controller";

const router: Router = Router();

router.get("/api/categories", categorieController.allCategories);

export default router;