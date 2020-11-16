const { spawn } = require('child_process')

const stream = spawn('ls', ['../'])

stream.stdout.on('data', (chunk)=> {
    console.log(chunk.toString());
})
stream.stderr.on('data', chunk => {
    console.log(chunk.toString())
})
