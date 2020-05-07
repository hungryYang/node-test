const fs = require('fs')
const { readFile, writeFile } = require('../index')
jest.mock('fs')
describe('test', () => {
    it('test1', async () => {
        const data = [{taskTitle: 'hi', done: false}]
        fs.setReadMockFiles('/xxx', null, JSON.stringify(data))
        const list = await readFile('/xxx')
        expect(list).toStrictEqual(data)
    })
    it('test2', async () => {
        let fakeFile
        fs.setWriteFileMocks('/yyy', (path, data, callback) => {
            fakeFile = data
            callback(null)
        })
        const list = [{title: 'test1', done: true}, {title: 'test2', done: true}]
        await writeFile('/yyy', list)
        expect(fakeFile).toBe(JSON.stringify(list))
    })
})
