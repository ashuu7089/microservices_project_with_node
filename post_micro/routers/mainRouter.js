import { Router  } from "express";
const router = Router()
import PostRouter  from '../routers/postRouter.js';


router.use("/api/post", PostRouter);

export default router;