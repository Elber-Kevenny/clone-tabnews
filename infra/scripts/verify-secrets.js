const fs = require("fs");
const { execSync } = require("child_process");

const secretPatterns = [
  /password\s*=\s*['"`].+['"`]/i,
  /secret_key\s*=\s*['"`].+['"`]/i,
  /AKIA[0-9A-Z]{16}/,
];

const verify = () => {
  let exist = false;
  console.log("rodando");
  // array de arquivos em stageg
  try {
    const files = execSync("git diff --cached --name-only", {
      encoding: "utf-8",
    })
      .trim()
      .split("\n");

    files.forEach((file) => {
      if (file && fs.existsSync(file)) {
        const content = fs.readFileSync(file, "utf-8");
        secretPatterns.forEach((pattern) => {
          if (pattern.test(content)) {
            console.log(
              `❌ Possíveis Senhas ou chaves vazadas no arquivo: ${file}`,
            );
            exist = true;
          }
        });
      }
    });

    if (exist) {
      console.log("❌ Senhas ou chaves vazadas detectadas!");
      process.exit(1);
    }
  } catch {
    return;
  }
};

verify();
