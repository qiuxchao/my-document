// 在 .babelrc 中使用了 `@babel/plugin-transform-arrow-functions` 来转换箭头函数
// 执行命令 npx babel src/arrow_functions.js --out-file dist/functions.js 进行转换
// 转换结果在 dist/functions.js
const a = [1, 2, 3];
const b = a.map(x => x * x);
console.log(b);

