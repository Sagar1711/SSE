from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from connexapi.Config import Settings
from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

def init_db():
    engine = create_engine(Settings.db)
    from connexapi import models
    Base.metadata.create_all(engine)
    return engine


def get_session(engine):
    session_factory = sessionmaker(bind=engine)
    session = scoped_session(session_factory)
    return session
