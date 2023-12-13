import { Router } from 'express'
import * as notaController from '../controllers/notes-controller'
import * as authController from '../controllers/auth-controller'

const router: Router = Router()

router.get("/api/note", notaController.allNotes) 
router.get("/api/note/:n", notaController.notesCategory)
router.get("/api/id", notaController.getLastNotesID)
router.get("/api/register", authController.register)

export default router