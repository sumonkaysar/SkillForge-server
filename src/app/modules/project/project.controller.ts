import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "../../utils/httpStatus";
import sendResponse from "../../utils/sendResponse";
import { ProjectServices } from "./project.service";

const addProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.addProject(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Project added successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.getAllProjects(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All projects retrieved successfully",
    data: result,
  });
});

const getSingleProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.getSingleProject(
    parseInt(req.params.projectId)
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project retrieved successfully",
    data: result,
  });
});

const editProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.editProject(
    parseInt(req.params.ProjectId),
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project edited successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectServices.deleteProject(
    parseInt(req.params.ProjectId)
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});

export const ProjectControllers = {
  addProject,
  getAllProjects,
  getSingleProject,
  editProject,
  deleteProject,
};
