# Prettier

Prettier 是一种代码格式化工具，它可以帮助我们自动格式化代码以符合您的风格指南。Prettier 支持多种编程语言，包括 JavaScript、TypeScript、CSS、JSON 等。

## 在 Vscode 中使用 Prettier

### 步骤 1：安装 Prettier 插件

- 打开 Visual Studio Code。

- 在菜单栏中选择“扩展”，然后搜索“Prettier - Code Formatter”。

- 点击安装按钮。

### 步骤 2：安装 Prettier 的命令行工具

Prettier 的命令行工具提供了命令行接口，可以通过命令行执行代码格式化。

要安装 Prettier 的命令行工具，请运行以下命令：

```sh
npm install --save-dev prettier
```

### 步骤 3：配置 Prettier

在项目的根目录中创建一个名为 `.prettierrc` 的文件，以配置 Prettier 的行为。

例如，如果我们希望使用单引号，并希望在每个文件的末尾留一个空行，则可以使用以下内容配置 Prettier：

```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "endOfLine": "lf",
  "printWidth": 120,
  "semi": true
}
```

:::details Prettier 常用的配置选项

1. `printWidth`：设置每行的最大字符数（默认值为 80）。
2. `tabWidth`：设置使用多少个空格来替换制表符（默认值为 2）。
3. `useTabs`：设置是否使用制表符来缩进（默认值为 false）。
4. `semi`：设置是否在语句的末尾添加分号（默认值为 true）。
5. `singleQuote`：设置是否使用单引号来引用字符串（默认值为 false）。
6. `trailingComma`：设置是否在对象和数组末尾添加逗号（默认值为 none）。
7. `bracketSpacing`：设置大括号内是否添加空格（默认值为 true）。
8. `jsxBracketSameLine`：设置 JSX 中的标签是否在同一行（默认值为 false）。

这只是 Prettier 支持的一部分配置选项，有关更多配置选项，请参阅官方文档：<https://prettier.io/docs/en/options.html>
:::

步骤 4：使用 Prettier

在 Visual Studio Code 中使用 Prettier，有两种方法：

1. 使用 Visual Studio Code 自带的格式化功能
2. 使用命令行工具

在这里我们介绍使用 Visual Studio Code 自带的格式化功能。

步骤如下：

1. 配置 Visual Studio Code：打开 Visual Studio Code 的设置（File > Preferences > Settings），搜索 “format on save” 并打开它。这样，每次保存文件时，Visual Studio Code 都会自动格式化代码。
2. 自定义 Prettier 配置：如果需要，可以在项目根目录创建一个 “.prettierrc” 文件，在其中添加自定义的 Prettier 配置。

那么就这样，我们已经成功地在 Visual Studio Code 中安装并使用了 Prettier。现在，每次保存文件时，Visual Studio Code 都会使用 Prettier 自动格式化代码，并帮助我们维护代码的一致性和可读性。

如果需要对代码进行批量格式化，可以使用命令行工具。在命令行中，使用 prettier 命令，并提供文件名或文件夹名作为参数。例如：

```sh
npx prettier --write src/
```

这将格式化项目中的所有源代码文件。

## 将 Prettier 接入到的 ESLint 项目中

使用 ESLint 和 Prettier 可以帮助我们更好地管理代码风格和质量。可以使用以下步骤将 Prettier 接入到现有的 ESLint 项目中：

1. 安装必要的依赖：

```sh
npm install --save-dev eslint-config-prettier eslint-plugin-prettier prettier
```

2. 在 `.eslintrc` 文件中启用 prettier：

```json
{
  "extends": [
    "eslint:recommended",
    "prettier"
  ],
  "plugins": [
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error"
  }
}

```

3. 配置 VSCode，以让它在保存文件时自动格式化代码

- 打开 VSCode 设置（Ctrl + ,），然后搜索“Editor: Format on Save”，并将其设置为“true”。

4. 在 VSCode 中安装 ESLint 和 Prettier 插件

- 在 VSCode 中打开扩展面板（Ctrl + Shift + X），搜索“ESLint”和“Prettier - Code Formatter”，然后安装它们。

这样，每当我们在 VSCode 中保存代码文件时，它都会自动使用 ESLint 和 Prettier 格式化代码，并在有错误时报告。

请注意，这仅是配置 Prettier 与 ESLint 的基本方法，可以根据需要进一步定制设置。

## 问题

### 已经完成了所有步骤，但保存文件时并未按照配置文件进行格式化

1. 右键需要格式化的文件
2. 点击 *使用...格式化文档*
3. 弹窗的选项中点击 *配置默认格式化程序*
4. 弹窗中选择 *Prettier - Code Formatter* 即可
