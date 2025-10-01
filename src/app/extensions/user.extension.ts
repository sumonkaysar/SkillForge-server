import { hash } from "bcrypt";

export const userExtension = {
  query: {
    user: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async $allOperations({ operation, args, query }: any) {
        if (["create", "update"].includes(operation)) {
          const data = args.data || args.create || args.update;
          if (data?.password && typeof data.password === "string") {
            data.password = await hash(data.password, 12);
          }
        }
        return query(args);
      },
    },
  },
};
