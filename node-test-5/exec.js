const { exec } = require('child_process')

exec('cat *.js 文件 | wc -l', (error, stdout, stderr) => {
    console.log(error)
    console.log(stdout);
    console.log(stderr);
})
