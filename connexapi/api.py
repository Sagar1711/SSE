import connexion
from connexapi.managers.database import init_db
from connexapi.APP.sse import stream, debug
from flask_cors import CORS
from flask_socketio import SocketIO

engine = init_db()

def create_app():
    app = connexion.FlaskApp(__name__, specification_dir='openapi/')
    flask_app = app.app
    CORS(flask_app)
    flask_app.config["SECRET_KEY"] = "somethingSecret"
    socketio = SocketIO(flask_app, cors_allowed_origins="*")
    app.add_api('api.yml')
    # app.add_url_rule("/hello", "hello", hello)
    # app.add_url_rule("/push", "push", stream)
    # app.add_url_rule("/subs", "subs", debug)
    return app, socketio

app, socketio = create_app()
