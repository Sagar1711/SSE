from connexapi.api import socketio
from flask_socketio import send, emit


def push_updated(data):
    print("hello")
    socketio.emit("process", data)

@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)
    emit("process", {"data": "Hello"})
