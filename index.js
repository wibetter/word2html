// 命令行工具
const yargs = require('yargs');

// 相应模块
const word2html = require('./convert');
const path = require('path');
const figlet = require('figlet');

// 样式
const chalk = require('chalk');

const titleTip = function(msg){
  return chalk.green(chalk.bold(msg));
}
const bigTip = figlet.textSync('word2html', {
  font: 'lean'
});

console.log(chalk.green(bigTip));

let argv = yargs
  .command('convert [options]', '将word目录中的word文档转换成html页面', (yargs) => {
    yargs
      .reset()
      .usage(titleTip('Usage')+': $0 convert [options]')
      .option('local',{
        alias: 'l',
        describe: '存放word的文件夹绝对地址',
        default: path.resolve(process.cwd(), 'word'),
      })
      .option('dist',{
        alias: 'd',
        describe: '存放html的文件夹绝对地址',
        default: path.resolve(process.cwd(), 'html'),
      })
      .option('title',{
        alias: 'tit',
        describe: '设置页面Title',
        default: 'word2html生成的静态页面',
      })
      .alias('h', 'help')
  }, (argv) => {
      if(!argv.l){
        yargs.showHelp();
      } else {
        word2html(argv);
      }
  })
  .alias('h','help')
  .alias('v','version')
  .help()
  .updateStrings({
    'Usage:': titleTip('Usage:'),
    'Commands:': titleTip('Commands:'),
    'Options:': titleTip('Options:')
  })
  .argv;

  if(!argv._[0]){
    yargs.showHelp();
  }
