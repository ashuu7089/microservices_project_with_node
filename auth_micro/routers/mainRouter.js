import { Router } from "express";

const router = Router();
import authRouter from '../routers/authRouter.js';
import userRouter from "../routers/userRouter.js";

router.use('/api/auth', authRouter);
router.use('/api/user', userRouter);

export default router;
