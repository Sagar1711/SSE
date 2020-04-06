from connexapi.api import session
from connexapi.models.process import Process
from connexapi.managers.database import init_db
from flask import request


def get_process():
    rows = session.query(Process).all()
    result = []
    for row in rows:
        data = {}
        data["ID"] = row.id
        data["name"] = row.name
        data["status"] = row.status
        result.append(data)
    session.remove()
    return {"result": result}

def add_process():
    data = request.json
    process = Process(name=data["name"], status=data["status"])
    session.add(process)
    session.commit()
    session.remove()
    return {"msg": "process created"}

def update_status():
    name = request.json["name"]
    process = session.query(Process).filter_by(name=name).first()
    new_status = request.json["status"]
    process.status = new_status
    session.commit()
    session.remove()
    return {"msg": f"Process {name} status changed to {new_status}"}

