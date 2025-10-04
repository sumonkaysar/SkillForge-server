import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import validateRequest from "../../middlewares/validateRequest";
import { BlogControllers } from "./blog.controller";
import { blogUpdateZodSchema, blogZodSchema } from "./blog.validation";

const router = Router();

router.patch(
  "/add",
  checkAuth(),
  validateRequest(blogZodSchema),
  BlogControllers.addBlog
);

router.get("/all", BlogControllers.getAllBlogs);

router.get("/:blogId", BlogControllers.getSingleBlog);

router.patch(
  "/edit/:blogId",
  checkAuth(),
  validateRequest(blogUpdateZodSchema),
  BlogControllers.editBlog
);

router.delete("/delete/:blogId", checkAuth(), BlogControllers.deleteBlog);

export const blogRoutes = router;
