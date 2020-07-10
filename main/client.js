import {Socket} from 'net'

let client = new Socket();
client.setEncoding('utf8');
client.on('data', chunk => {
    console.log(chunk);
})
client.on('error', e => {
    console.log(e);
})
client.connect(8000, 'localhost');
setInterval(() => {
    client.write(new Date().toString());
}, 1000);
