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
  .command('convert [local] [options]', '将word目录中的word文档转换成html页面', (yargs) => {
    yargs
      .reset()
      .usage(titleTip('Usage')+': $0 [local] [options]')
      .option('local',{
        alias: 'l',
        describe: '本地文件夹或文件的绝对地址',
        default: path.resolve(process.cwd(), 'word'),
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
