// 在 .babelrc 中使用了 `@babel/preset-env` 来转换 ES6
// 执行命令 npx babel src/es6.js --out-file dist/es5.js 进行转换
// 转换结果在 dist/es5.js
const a = [1, 2, 3];
const b = a.map(x => x * x);
console.log(b);