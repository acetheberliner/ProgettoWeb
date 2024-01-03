import { Router } from 'express'
import * as postNotesController from '../controllers/post-notes-controller'

const router: Router = Router()

router.post("/api/createPost", postNotesController.createPost)
router.delete("/api/deletePost/:id", postNotesController.deletePost)

export default router