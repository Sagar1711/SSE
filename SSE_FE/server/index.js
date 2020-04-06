const express = require('express');
const parser = require(`body-parser`);
const cors = require('cors')
const app = express()
const EventEmitter = require(`events`);

const Stream = new EventEmitter();

app.use(parser.json());
app.use(
    parser.urlencoded({
        extented: true,
    })
);
app.use(cors())
app.get("/my-endpoint", (req, resp) => {
    resp.writeHead(
        200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        }
    );

    Stream.on('push', (event, data) => {
        resp.write('event: ' + String(event) + '\n' + 'data: ' + JSON.stringify(data) + '\n\n');
    });
});

setInterval(() => {
    Stream.emit('push', 'message', {msg: 'it works'});
}, 1000);

app.listen(4000);

console.log('Node is running')
