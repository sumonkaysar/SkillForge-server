/* eslint-disable no-console */
import { Server } from "http";
import app from "./app";
import { prisma } from "./app/config/db.config";
import env from "./app/config/env.config";
import seedSuperAdmin from "./app/utils/seedSuperAdmin";

let server: Server;

const main = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to DB!");

    server = app.listen(env.PORT, () => {
      console.log(`Server is on port ${env.PORT}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

(async () => {
  await seedSuperAdmin();
  await main();
})();

// Unhandled Rejection Error
process.on("unhandledRejection", (err) => {
  console.log(
    `😈 Unhandled Rejection is detected, server is shutting down ...`,
    err
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// Uncaught Rejection Error
process.on("uncaughtException", (err) => {
  console.log(
    `😈 Unhandled Exception is detected, server is shutting down ...`,
    err
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// SIGTERM
process.on("SIGTERM", () => {
  console.log("😈 SIGTERM signal received, server is shutting down ...");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// SIGINT
process.on("SIGINT", () => {
  console.log("😈 SIGINT signal received, server is shutting down ...");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
