import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "../../utils/httpStatus";
import sendResponse from "../../utils/sendResponse";
import { SkillServices } from "./skill.service";

const addSkill = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillServices.addSkill(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Skill added successfully",
    data: result,
  });
});

export const SkillControllers = {
  addSkill,
};
