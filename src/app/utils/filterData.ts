import { Prisma, PrismaClient } from "@prisma/client";

interface IFilterData<T extends keyof PrismaClient> {
  model: Prisma.UserDelegate<any>;
  query: Record<string, string | object>;
  searchableFields?: string[];
}

const FilterData = async <T extends keyof PrismaClient>({
  model,
  query,
  searchableFields,
}: IFilterData<T>) => {
  const {
    searchTerm = "",
    sort = "-createdAt",
    fields = "",
    page = "1",
    limit = "10",
    ...filter
  } = query;

  let finalQuery = { ...filter } as Record<string, string | object>;

  if (searchTerm && searchableFields?.length) {
    finalQuery = {
      $and: [
        filter,
        {
          $or: searchableFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: "i" },
          })),
        },
      ],
    };
  }

  const filtered = model.findMany(finalQuery);

  const total = await model.countDocuments(finalQuery);

  return {
    data: filtered,
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

export default FilterData;
