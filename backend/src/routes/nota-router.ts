import { Router } from 'express'
import * as notaController from '../controllers/nota-controller'

const router: Router = Router()

router.get("/api/note", notaController.nota) 

export default router