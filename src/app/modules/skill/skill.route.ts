import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { SkillControllers } from "./skill.controller";
import { skillUpdateZodSchema, skillZodSchema } from "./skill.validation";

const router = Router();

router.post(
  "/add",
  checkAuth(),
  validateRequest(skillZodSchema),
  SkillControllers.addSkill
);

router.get("/all", checkAuth(), SkillControllers.getAllSkills);

router.get("/all/grouped", SkillControllers.getSkillsGroupedBySkillset);

router.patch(
  "/edit/:skillId",
  checkAuth(),
  validateRequest(skillUpdateZodSchema),
  SkillControllers.editSkill
);

export const SkillRoutes = router;
