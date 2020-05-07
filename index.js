const fs = require('fs')
const path = require('path')
const homeDir = process.env.HOME || process.env.USERPROFILE
const dbPath = path.join(homeDir, 'todo.txt')
const inquirer = require('inquirer')

function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, { flag: 'a+' }, (error, data) => {
            if (error) {
                reject(error)
            }
            let list =  []

            if (!data.toString())  {
                list = []
            } else {
                list = JSON.parse(data.toString())
            }

            resolve(list)
        })
    })
}

function writeFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data), (err) => {
            if (err) {
                reject(err)
            }
            resolve()
        })
    })
}

function updateTitle(list, index) {
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: '新的标题',
        default: list[index].title
    }).then(answer => {
        list[index].taskTitle = answer.title
        writeFile(dbPath, list)
    })
}

async function showAllTask () {
    const list = await readFile(dbPath)
    inquirer
        .prompt({
            type: 'list',
            name: 'index',
            message: 'What do you want to do?',
            choices: list.map((item, index) => {
                return {
                    name: `${item.taskTitle}-${item.done ? '[x]' : '[_]'}`, value: index
                }
            })
        })
        .then(answers => {
            const index = answers.index
            if (index >= 0) {
                inquirer
                    .prompt({
                        type: 'list',
                        name: 'index',
                        message: 'What do you want to do?',
                        choices: [{
                            name: '已完成',
                            value: 'markAsDone'
                        },{
                            name: '删除',
                            value: 'delete'
                        },{
                            name: '改标题',
                            value: 'changeTitle'
                        }]
                    })
                    .then(async answers => {
                        switch (answers.index) {
                            case 'markAsDone':
                                list[index].done = true
                                await writeFile(dbPath, list)
                                break
                            case 'delete':
                                list.splice(index, 1)
                                await writeFile(dbPath, list)
                                break
                            case 'changeTitle':
                                updateTitle(list, index)
                                break
                        }
                    });
            }
        });

}

module.exports = {
    writeFile,
    readFile,
    showAllTask
}
