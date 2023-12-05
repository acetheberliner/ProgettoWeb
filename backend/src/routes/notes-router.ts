import { Router } from 'express'
import * as notaController from '../controllers/notes-controller'

const router: Router = Router()

router.get("/api/note", notaController.allNotes) 
router.get("/api/note/:n", notaController.notesPerCategory)

export default router