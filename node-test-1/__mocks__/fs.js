const path = require('path');

const fs = jest.genMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let readMockFiles = {};
function setReadMockFiles(path, error, data) {
    readMockFiles[path] = [error, data]
}

function readFile(path, options, callback) {
    if (callback === undefined) {callback = options}
    return callback(...readMockFiles[path]);
}

let writeMockFiles = {}

function setWriteFileMocks(path, fn) {
    writeMockFiles[path] = fn
}

function writeFile(path, data, options, callback) {
    writeMockFiles[path](path, data, options, callback)
}

fs.setReadMockFiles = setReadMockFiles;
fs.setWriteFileMocks = setWriteFileMocks
fs.readFile = readFile;
fs.writeFile = writeFile
module.exports = fs;
