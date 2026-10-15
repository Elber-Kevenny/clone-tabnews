import database from "infra/database.js";

const status = async (_request, response) => {
  const updateAt = new Date().toISOString();
  const query1 = {
    text: "SELECT name, setting FROM pg_settings WHERE name IN ('max_connections', 'server_version');",
  };

  const databaseName = process.env.POSTGRES_DB;
  const result = await database.query(query1);
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  const version = result.rows[1].setting;
  const maxConnections = result.rows[0].setting;

  response.status(200).json({
    updated_at: updateAt,
    dependencies: {
      database: {
        version,
        max_conections: parseInt(maxConnections),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
};

export default status;
