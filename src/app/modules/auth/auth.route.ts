import { Router } from "express";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post("/login", AuthControllers.credentialsLogin);

router.get("/logout", AuthControllers.logout);

router.patch("/change-password", AuthControllers.changePassword);

export const AuthRoutes = router;
