import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "../../utils/httpStatus";
import sendResponse from "../../utils/sendResponse";
import { SkillServices } from "./skill.service";

const addSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillServices.addSkill(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Skill added successfully",
    data: result,
  });
});

const getAllSkills = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillServices.getAllSkills();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All skills retrieved successfully",
    data: result,
  });
});

const getSkillsGroupedBySkillset = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SkillServices.getSkillsGroupedBySkillset();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All grouped skills retrieved successfully",
      data: result,
    });
  }
);

const editSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillServices.editSkill(
    Number(req.params.skillId),
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill edited successfully",
    data: result,
  });
});

export const SkillControllers = {
  addSkill,
  getAllSkills,
  getSkillsGroupedBySkillset,
  editSkill,
};
