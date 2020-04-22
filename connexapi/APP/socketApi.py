from connexapi.api import socketio
from flask_socketio import send, emit


def push_updated(data):
    socketio.emit("process", data)

