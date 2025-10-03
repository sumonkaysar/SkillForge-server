import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { projectRoutes } from "../modules/project/project.route";
import { SkillRoutes } from "../modules/skill/skill.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/skills",
    route: SkillRoutes,
  },
  {
    path: "/projects",
    route: projectRoutes,
  },
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
