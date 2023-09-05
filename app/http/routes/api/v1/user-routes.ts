import "reflect-metadata";
import { Router } from "express";
import expressCallback from "../../../utils/express-callback";
import UserController from "@controller/user-controller";

import auth from "@http/middlewares/auth";

const router = Router();

const userController = new UserController();

router.post("/login", expressCallback(userController.login));
router.post("/register", expressCallback(userController.register));
router.post("/refresh-token", expressCallback(userController.refreshToken));

router.get("/list", auth, expressCallback(userController.getAll));
router.get("/", auth, expressCallback(userController.getAge));

export default router;
