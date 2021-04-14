const fs = require("fs");
const path = require("path");

const autoLoader = (dirname: string) => {
  const files = {} as any;

  fs.readdirSync(dirname).forEach((fileName: string) => {
    const shouldLoadFile = fileName !== "index.ts" && fileName.includes(".ts");
    const shouldLoadDir = fileName !== "index.ts" && fileName !== "__tests__";

    const filePath = path.join(dirname, fileName);

    if (shouldLoadFile) {
      files[fileName.replace(".ts", "")] = require(filePath).default;
    } else if (shouldLoadDir) {
      files[fileName] = autoLoader(filePath);
    }
  });

  return files;
};

export default autoLoader;
