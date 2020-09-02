const fs = require('fs')
function writeOneMillionTimes(writer, data, encoding, callback) {
    let i = 1000000;
    write();
    function write() {
        let ok = true;
        do {
            i--;
            if (i === 0) {
                // 最后一次写入。
                writer.write(data);
            } else {
                // 检查是否可以继续写入。
                // 不要传入回调，因为写入还没有结束。
                ok = writer.write(data, encoding);
            }
        } while (i > 0 && ok);
        if (i > 0) {
            // 被提前中止。
            // 当触发 'drain' 事件时继续写入。
            console.log('drain')
            writer.once('drain', write);
        }
    }
}

const stream = fs.createWriteStream('./file.txt')
writeOneMillionTimes(stream, '这算是一次写入')
