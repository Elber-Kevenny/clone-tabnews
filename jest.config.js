const nextJest = require("next/jest");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(process.cwd(), `.env.development`),
});

const createJestConfig = nextJest();
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
