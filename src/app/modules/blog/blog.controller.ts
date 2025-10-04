import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "../../utils/httpStatus";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";

const addBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.addBlog(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Blog added successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getAllBlogs(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All blogs retrieved successfully",
    data: result,
  });
});

const getSingleBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getSingleBlog(parseInt(req.params.blogId));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog retrieved successfully",
    data: result,
  });
});

const editBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.editBlog(
    parseInt(req.params.BlogId),
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog edited successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.deleteBlog(parseInt(req.params.BlogId));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Blog deleted successfully",
    data: result,
  });
});

export const BlogControllers = {
  addBlog,
  getAllBlogs,
  getSingleBlog,
  editBlog,
  deleteBlog,
};
