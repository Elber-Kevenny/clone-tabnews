import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

const runner = migrationRunner.default || migrationRunner;

const migrations = async (request, response) => {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).json({
      error: `Method "${request.method}" not allowed`,
    });
  }
  let dbClient;

  try {
    dbClient = await database.getNewClient();
    const migrationsConfig = {
      dbClient,
      dir: join("infra", "migrations"),
      direction: "up",
      dryrun: true,
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
      const pendingMigrations = await runner(migrationsConfig);
      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await runner({
        ...migrationsConfig,
        dryrun: false,
      });

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }
      return response.status(200).json(migratedMigrations);
    }
  } catch (e) {
    console.error(e.message);
    throw e;
  } finally {
    await dbClient.end();
  }
};
export default migrations;
