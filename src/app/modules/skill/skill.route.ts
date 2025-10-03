import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { SkillControllers } from "./skill.controller";
import { skillUpdateZodSchema, skillZodSchema } from "./skill.validation";

const router = Router();

router.patch(
  "/add",
  checkAuth(),
  validateRequest(skillZodSchema),
  SkillControllers.addSkill
);

router.patch("/all", checkAuth(), SkillControllers.getAllSkills);

router.patch("/all/grouped", SkillControllers.getSkillsGroupedBySkillset);

router.patch(
  "/edit",
  checkAuth(),
  validateRequest(skillUpdateZodSchema),
  SkillControllers.editSkill
);

export const AuthRoutes = router;
