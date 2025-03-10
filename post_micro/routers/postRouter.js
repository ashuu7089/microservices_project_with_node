import { Router } from 'express'
import PostController from '../controllers/postController.js'
import authMiddleware from '../middlewares/authMiddleware.js';
const router = Router()


router.post("/create_post", authMiddleware, PostController.store);
router.get("/get_posts", PostController.index);

export default router;
