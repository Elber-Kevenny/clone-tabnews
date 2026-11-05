const nextJest = require("next/jest");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(process.cwd(), `.env.development`),
});

const createJestConfig = nextJest({
  dir: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

module.exports = jestConfig;
