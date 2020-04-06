import connexion
from connexapi.managers.database import init_db
from connexapi.APP.sse import hello, push, stream

session = init_db()

def create_app():
    app = connexion.FlaskApp(__name__, specification_dir='openapi/')
    app.add_api('api.yml')
    # app.add_url_rule("/hello", "", hello)
    app.add_url_rule("/push", "push", push)
    app.add_url_rule("/stream", "stream", stream)
    return app

app = create_app()

