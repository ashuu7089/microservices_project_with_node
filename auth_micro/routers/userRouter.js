import { Router } from "express";
import UserController from "../controllers/userController.js";

const router = Router();

router.get('/get_user/:id', UserController.getUser);


export default router;
