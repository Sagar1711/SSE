from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

def update_event():
    socketio.emit('process', {'data': 42})

@app.route('/index')
def hello_world():
    update_event()
    return 'Hello, World!'

if __name__ == "__main__":
    socketio.run(app, host="127.0.0.1", port=4000, debug=True)
