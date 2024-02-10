import { Router } from "express";
import * as notaController from "../controllers/notes-controller";

const router: Router = Router();

router.get("/api/note", notaController.allNotes);
router.get("/api/note/:n", notaController.notesCategory);
router.get("/api/noteid/:id", notaController.notesFromID);
router.get("/api/state/:id", notaController.notesFromState);
router.get("/api/usernote/:id", notaController.notesFromUser);

export default router;
