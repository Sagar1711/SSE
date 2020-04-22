from connexapi.api import app
# from werkzeug.serving import WSGIRequestHandler
if __name__ == "__main__":
    # WSGIRequestHandler.protocol_version = "HTTP/1.1"
    # socketio.run(app.app, host="localhost", port=3000, debug=True)
    app.run(host="localhost", port=3000, debug=True)
