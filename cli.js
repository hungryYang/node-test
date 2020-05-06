const { program } = require('commander');
const { readFile, writeFile, showAllTask } = require('./index')
program
    .command('add')
    .option('-a,--action <action>')
    .description('add task')
    .action(async (source) => {
        const list = await readFile()
        list.push({ taskTitle: source.args.join(' '), done: false })
        writeFile(list)
            .then(() => console.log('创建成功'))
            .catch(() => console.log('创建失败'))
    })

program
    .command('show')
    .option('-s,--show <action>')
    .description('show task')
    .action(async () => {
        showAllTask()
    })

program.parse(process.argv);
