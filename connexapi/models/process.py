from connexapi.managers.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy import event
from queue import Queue
import json


dataQueue = Queue()
# gen = None

# def gen_func(data):
#     yield f"data: {json.dumps(data)}\n\n"


class Process(Base):
    __tablename__ = "Process"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String)
    status = Column(String)

@event.listens_for(Process, 'after_update')
def receive_after_update(mapper, connection, target):
    print(target.status)
    data = {
        "name": target.name,
        "status": target.status
    }
    dataQueue.put(data)


