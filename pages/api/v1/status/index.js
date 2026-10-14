import database from "infra/database.js";

const status = async (_request, response) => {
  const result = await database.query("SELECT 1 + 1;");
  console.log(result.rows);
  response.status(200).json({ massa: "massinha" });
};

export default status;
