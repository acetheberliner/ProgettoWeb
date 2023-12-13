import { Router } from 'express'
import * as postNotesController from '../controllers/post-notes-controller'

const router: Router = Router()

router.post("/api/posts", postNotesController.createPost)
router.delete("/api/posts/:id", postNotesController.deletePost)

export default router