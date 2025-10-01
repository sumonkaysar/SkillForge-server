import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { changePasswordZodSchema } from "./auth.validation";

const router = Router();

router.post("/login", AuthControllers.credentialsLogin);

router.get("/logout", AuthControllers.logout);

router.patch(
  "/change-password",
  checkAuth(),
  validateRequest(changePasswordZodSchema),
  AuthControllers.changePassword
);

export const AuthRoutes = router;
