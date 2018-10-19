

# word2html: word文档转html工具
### 注：只处理后缀为'.docx'的word文档。

## 使用方法1

- **全局安装**

```bash
#全局安装
npm i -g git+ssh://git@github.com:wibetter/word2html.git
```

- **查看帮助**
```bash
# 查看所有命令
word2html -h
```

- **默认将word目录中的word文档转换成html页面，并放置在html目录中**
```bash
# 运行word2html convert执行转换任务，默认转换当前项目word文件夹中的word文档。
word2html convert
# 设置页面title。
word2html convert --title=wibetter的页面
```

- **将指定目录中的word文档转换成html页面，并放置在html目录中**
```bash
# word2html convert 存放word文档的文件夹地址
word2html convert --local=D:\sinaweb\word2html\word
或 word2html convert D:\sinaweb\word2html\word （和上一个命令等价）

# 设置html页面的Title
word2html convert --local=D:\sinaweb\word2html\word --title=wibetter的页面

# 设置html页面存放的位置
word2html convert --local=D:\sinaweb\word2html\word --dist D:\mywork\word2html\html
```


## 使用方法2

- **安装**

```bash
#安装
npm i git+ssh://git@github.com:wibetter/word2html.git --save-dev
```
- **示例**

```bash
# 引入word2html
const word2html = require('word2html');

# 将存放word文档的文件夹路径以参数形式输入
word2html('D:/sinaweb/word2html/word');
# 也可以直接执行word2html()，默认转换当前项目word文件夹中的word文档

# 设置html页面的Title
word2html('D:/sinaweb/word2html/word', 'wibetter');

# 设置html页面存放的位置
word2html('D:/sinaweb/word2html/word', 'wibetter', 'D:/mywork/word2html/html');
```

