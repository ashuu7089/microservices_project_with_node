import { Router } from "express";
import AuthController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/view', authMiddleware, AuthController.user);


export default router;
