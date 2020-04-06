from connexapi.api import app
from werkzeug.serving import WSGIRequestHandler
from flask_cors import CORS

if __name__ == "__main__":
    WSGIRequestHandler.protocol_version = "HTTP/1.1"
    CORS(app.app)
    app.run(host="localhost", port=3000, debug=True)
