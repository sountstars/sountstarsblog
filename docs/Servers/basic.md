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
