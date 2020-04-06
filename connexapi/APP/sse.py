from flask import Response, stream_with_context 
import time
import json
from connexapi.models.process import dataQueue

def hello():
    return "Hello"

def push():
    def generate():
        while True:
            if not dataQueue.empty():
                yield f"data: {json.dumps(dataQueue.get())}\n\n"
    return Response(generate(), mimetype="text/event-stream")

def stream():
    def generate_stream():
        data = dataQueue.get()
        print(data)
        yield f"data: {json.dumps(data)}\n\n"
    return Response(stream_with_context(generate_stream()), mimetype="text/event-stream")

def s(data):
    print(data)
