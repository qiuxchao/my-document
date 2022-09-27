# Vscode 配置

## 配置项目路径别名

配置项目路径别名，可以使用 `@` 引入包。

如何配置？

- 在项目中的 `.vscode/setting.json` 中新增

```json
{
    "path-intellisense.mappings": {
      "@": "${workspaceRoot}",
    },
}
```