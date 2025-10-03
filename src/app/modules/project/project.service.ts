import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db.config";

const addProject = async (payload: Prisma.ProjectCreateInput) => {
  const project = await prisma.project.create({ data: payload });
  return project;
};

const getAllProjects = async ({
  page = "1",
  limit = "10",
  sortBy = "createdAt",
  sortOrder = "desc",
  searchTerm = "",
  techNames = [] as string[],
}) => {
  const searchableFields = [
    "name",
    "title",
    "description",
    "longDescription",
    "features",
    "category",
  ];

  const where: Prisma.ProjectWhereInput = {
    AND: [
      ...(techNames.length
        ? techNames.map((name) => ({
            techStack: {
              some: {
                name: { equals: name, mode: Prisma.QueryMode.insensitive },
              },
            },
          }))
        : []),
      ...(searchTerm
        ? searchableFields.map((field) => ({
            [field]: { contains: searchTerm, mode: "insensitive" },
          }))
        : []),
    ],
  };

  const projects = await prisma.project.findMany({
    where,
    take: parseInt(limit),
    skip: parseInt(page) - 1 * parseInt(limit),
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const totalProjects = await prisma.project.count({ where });

  return {
    data: projects,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total: totalProjects,
      totalPages: Math.ceil(totalProjects / Number(limit)),
    },
  };
};

const getSingleProject = async (projectId: number) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: { techStack: true },
  });
  return project;
};

const editProject = async (
  projectId: number,
  payload: Prisma.ProjectUpdateInput
) => {
  const updatedProject = await prisma.project.update({
    where: { id: projectId },
    data: payload,
  });
  return updatedProject;
};

const deleteProject = async (projectId: number) => {
  await prisma.skill.delete({
    where: { id: projectId },
  });
  return null;
};

export const ProjectServices = {
  addProject,
  getAllProjects,
  getSingleProject,
  editProject,
  deleteProject,
};
