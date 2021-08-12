# Nodejs

[[TOC]]

## 开启 import

```js
require("@babel/register")({
  babelrc: false,
  presets: ["@babel/preset-env"]
});

const {language} = require("./index");
module.exports = language;

//package.json
devDependencies: {
    "@babel/core": "^7.14.8",
    "@babel/preset-env": "^7.14.8",
    "@babel/register": "^7.14.5",
}
```

### 批量格式化

```js
const prettier = require("prettier");
const fs = require("fs");
const getPrettierFiles = require("./getPrettierFiles");
const prettierConfigPath = require.resolve("../.prettierrc");//配置文件
const chalk = require("chalk");

let didError = false;
const files = getPrettierFiles();

files.forEach((file) => {
  const options = prettier.resolveConfig.sync(file, {
    config: prettierConfigPath,
  });
  const fileInfo = prettier.getFileInfo.sync(file);
  if (fileInfo.ignored) {
    return;
  }
  try {
    const input = fs.readFileSync(file, "utf8");
    const withParserOptions = {
      ...options,
      parser: fileInfo.inferredParser,
    };
    const output = prettier.format(input, withParserOptions);
    if (output !== input) {
      fs.writeFileSync(file, output, "utf8");
      console.log(chalk.green(`${file} is prettier`));
    }
  } catch (e) {
    didError = true;
  }
});

if (didError) {
  process.exit(1);
}
console.log(chalk.hex("#1890FF")("prettier success!"));

//===>>
const glob = require("glob");

const getPrettierFiles = () => {
  let files = [];
  const jsFiles = glob.sync("src/**/*.js*", {
    ignore: ["**/node_modules/**", "build/**"],
  });

  files = [...jsFiles];
  if (!files.length) {
    return;
  }
  return files;
};

module.exports = getPrettierFiles;
```
