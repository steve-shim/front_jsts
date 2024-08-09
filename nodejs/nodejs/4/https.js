const lib = require('./lib');

function makeRequest(url, data) {
    // 암호화한 후 요청을 보내기 
    // lib.request.send(url, data)
    // 복호화한 응답을 return 하기
    // return lib.response.read();
}


const responseData = makeRequest('https://naver.com', 'any data');
console.log(require);