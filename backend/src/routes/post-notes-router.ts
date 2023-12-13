import { Router } from 'express'
import * as postNotesController from '../controllers/post-notes-controller'

const router: Router = Router()

router.get("/api/post/id", postNotesController.getLastNotesID)

export default router