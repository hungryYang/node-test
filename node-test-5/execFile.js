const { execFile } = require('child_process')

const userInput = '.'

execFile('ls', ['-la', userInput], {},(error, stdout, stderr) => {
    console.log(error);
    console.log(stdout);
    console.log(stderr);
})
