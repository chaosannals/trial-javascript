import { Socket } from 'net'

let client = new Socket();
client.on('data', chunk => {
    console.log(chunk);
})
client.on('error', e => {
    console.log(e);
})
client.connect(8000, 'localhost');
setInterval(() => {
    let buffer = Buffer.alloc(8);
    buffer.writeUInt16BE(0xA00A, 0);
    buffer.writeUInt32BE(1234, 2);
    buffer.writeUInt16BE(0x0AA0, 6);
    client.write(buffer);
}, 1000);
