# 常用代码片段

## `File` 文件对象转 `base64` 字符串

```js
const reader = new FileReader();
reader.onload = (e) => {
  // e.target.result 就是 base64 字符串
  console.log(e.target.result)
};
// file 为 File 对象
reader.readAsDataURL(file);
```

## `File` 文件对象生成本地URL地址

```js
// file 为 File 对象
const url = URL.createObjectURL(file);
// url 本地 URL 地址
console.log(url);
```

