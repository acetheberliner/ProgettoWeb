import { Router } from "express";
import * as postNotesController from "../controllers/post-notes-controller";

const router: Router = Router();

router.post("/api/createPost", postNotesController.createPost);
router.post("/api/deletePost/:id", postNotesController.deletePost);
router.post("/api/editPost", postNotesController.editPost)

export default router;
