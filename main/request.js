import http from 'https'

const request = http.request('https://www.baidu.com', response => {
    console.log(response);
});