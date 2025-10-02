import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { SkillControllers } from "./skill.controller";
import { skillZodSchema } from "./skill.validation";

const router = Router();

router.patch(
  "/add",
  checkAuth(),
  validateRequest(skillZodSchema),
  SkillControllers.addSkill
);

export const AuthRoutes = router;
