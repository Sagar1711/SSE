from connexapi.api import app, socketio
# from werkzeug.serving import WSGIRequestHandler
if __name__ == "__main__":
    # WSGIRequestHandler.protocol_version = "HTTP/1.1"
    # socketio.run(app.app, host="localhost", port=3000, debug=True)
    # app.app.run(host="localhost", port=3000, debug=True)
    socketio.run(app, host="127.0.0.1", port=3000, debug=True)
