
const mammoth = require("mammoth");
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 删除文件
const del = require('del');

// 样式
const chalk = require('chalk');
const suceessTip = function(msg) {
  console.log(chalk.green('*') + ' ' + msg);
};

// 根据文档内容创建html页面
const createHtml = function (document, fileName, fileRemote, htmlTitle) {
  let newFileDir = path.resolve(process.cwd(), 'html'); // 编写第三方插件的时候尽量不使用 __dirname
  newFileDir = path.resolve(newFileDir, './' + fileRemote); // 兼容性写好，同时接收用户输入的'D:/test'和'D:/test/'格式
  fs.exists(newFileDir, function(exists) {
    if (!exists) {
      fs.mkdir(newFileDir, function(){
        // console.log(JSON.stringify(err));
      });
    }
  })
  let filePath = path.resolve(newFileDir, fileName + '.html');
  filePath = filePath.replace(/\\/g, '/');

  const htmlTemplatePath = path.resolve(__dirname, 'template', 'common.html');
  fs.readFile(htmlTemplatePath, 'utf8', function(err, htmlTemplate){

    let newDocument = htmlTemplate.replace(/#bodyDocument/g, document)
      .replace(/#documentTitle/g, htmlTitle);

    fs.writeFile(filePath, newDocument, (err) => {
      if (err) {
        throw Error(err);
      }
      suceessTip('成功生成'+ filePath);
    });

  })
};

const convert = function (configs) {
  if (configs.local) {
    console.log("先清空html文件夹。。。");

    const htmlDir = path.resolve(process.cwd(), 'html');
    del([htmlDir + '/**'], {
      force: true
    }).then(() => {
      suceessTip(htmlDir + '目录文件已清空');
      // 创建html目录
      fs.mkdir(htmlDir, function(){

        const wordFiles = glob.sync(path.resolve(configs.local, '**/*.docx'));
        if (wordFiles.length == 0) {
          console.log(chalk.yellow('warn: ' + configs.local + '中没有找到word文档。'));
        }
        wordFiles.forEach(item => {
          const one = path.parse(item);
          const fileDir = one.dir;
          let fileRemote;
          if (configs.local.replace(fileDir, '') == '/' ||
            fileDir.replace(configs.local, '') == '/') {
            fileRemote = '';
          } else {
            fileRemote = fileDir.replace(configs.local, '');
          }
          const fileName = one.name;
          mammoth.convertToHtml({path: item })
            .then(function(result){
              var htmlDocument = result.value; // The generated HTML
              createHtml(htmlDocument, fileName, fileRemote, configs.title);
            })
            .done();
        });
      });
    })
    .catch(new Function());
  }
};

module.exports = function (configs) {

  // pc 斜杆处理
  configs.local = configs.local.replace(/\\/g, '/');

  convert(configs);
}
