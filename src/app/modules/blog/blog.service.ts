import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db.config";

const addBlog = async (payload: Prisma.BlogCreateInput) => {
  const blog = await prisma.blog.create({ data: payload });
  return blog;
};

const getAllBlogs = async ({
  page = "1",
  limit = "10",
  sortBy = "createdAt",
  sortOrder = "desc",
  searchTerm = "",
  tags = [] as string[],
}) => {
  const searchableFields = ["title", "content", "category", "features"];

  const where: Prisma.BlogWhereInput = {
    AND: [
      tags.length > 0 ? { tags: { hasSome: tags } } : {},
      ...(searchTerm
        ? searchableFields.map((field) => ({
            [field]: { contains: searchTerm, mode: "insensitive" },
          }))
        : []),
    ],
  };

  const blogs = await prisma.blog.findMany({
    where,
    take: parseInt(limit),
    skip: parseInt(page) - 1 * parseInt(limit),
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const totalBlogs = await prisma.blog.count({ where });

  return {
    data: blogs,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total: totalBlogs,
      totalPages: Math.ceil(totalBlogs / Number(limit)),
    },
  };
};

const getSingleBlog = async (blogId: number) => {
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
    include: { author: true },
  });
  return blog;
};

const editBlog = async (blogId: number, payload: Prisma.BlogUpdateInput) => {
  const updatedBlog = await prisma.blog.update({
    where: { id: blogId },
    data: payload,
  });
  return updatedBlog;
};

const deleteBlog = async (blogId: number) => {
  await prisma.skill.delete({
    where: { id: blogId },
  });
  return null;
};

export const BlogServices = {
  addBlog,
  getAllBlogs,
  getSingleBlog,
  editBlog,
  deleteBlog,
};
