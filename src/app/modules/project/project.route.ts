import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { ProjectControllers } from "./project.controller";
import { projectUpdateZodSchema, projectZodSchema } from "./project.validation";

const router = Router();

router.patch(
  "/add",
  checkAuth(),
  validateRequest(projectZodSchema),
  ProjectControllers.addProject
);

router.get("/all", ProjectControllers.getAllProjects);

router.get("/:projectId", ProjectControllers.getSingleProject);

router.patch(
  "/edit/:projectId",
  checkAuth(),
  validateRequest(projectUpdateZodSchema),
  ProjectControllers.editProject
);

router.delete(
  "/delete/:projectId",
  checkAuth(),
  ProjectControllers.deleteProject
);

export const projectRoutes = router;
