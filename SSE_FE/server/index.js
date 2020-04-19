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
        console.log(data);
        resp.write('event: ' + String(event) + '\n' + 'data: ' + JSON.stringify(data) + '\n\n');
    });
});

let array = ['1st', '2nd', '3rd', '4th', '5th']

// setInterval(() => {
//     Stream.emit('push', 'message', {msg: 'element'});
// }, 5000);


for (let index = 0; index < array.length; index++) {
    const element = array[index];
    setTimeout(() => {
        Stream.emit('push', 'message', {msg: element});
    }, (index+1)*6000);
}


app.listen(4000);

console.log('Node is running')
