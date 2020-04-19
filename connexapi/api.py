import connexion
from connexapi.managers.database import init_db
from connexapi.APP.sse import stream, debug
from flask_cors import CORS

engine = init_db()

def create_app():
    app = connexion.FlaskApp(__name__, specification_dir='openapi/')
    CORS(app.app)
    app.add_api('api.yml')
    # app.add_url_rule("/hello", "hello", hello)
    app.add_url_rule("/push", "push", stream)
    app.add_url_rule("/subs", "subs", debug)
    return app

app = create_app()

