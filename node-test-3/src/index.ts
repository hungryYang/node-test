import * as https from 'https';
import * as queryString from 'querystring';
import * as userInfo from './private'
import {IncomingMessage} from 'http';

const md5 = require('md5')
const random = Math.random()

type resultData = {
    error_code?: string;
    error_msg?: string;
    from: string;
    to: string;
    trans_result: { src: string; dst: string; }[]
}

function translate(word: string) {
    const query = {
        q: "apple",
        from: "en",
        to: "zh",
        appid: userInfo.appId,
        salt: random,
        sign: md5(`${userInfo.appId}${word}${random}${userInfo.password}`)
    }

    const queryPath = queryString.stringify(query)

    const options = {
        hostname: 'fanyi-api.baidu.com',
        port: 443,
        path: encodeURI('/api/trans/vip/translate?' + queryPath),
        method: 'GET'
    };

    const req = https.request(options, (response: IncomingMessage) => {
        let data = []
        response.on('data', (chunk) => {
            data.push(chunk)
        });
        response.on('end', () => {
            const result: resultData = JSON.parse(data.toString())
            result.trans_result.map(item => {
                console.log(item.dst);
            })
        })
    });
    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}

module.exports = translate
