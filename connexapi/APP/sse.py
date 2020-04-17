from flask import Response, stream_with_context, current_app
import time
import json
from connexapi.models.process import dataQueue

# def messages():
#     yield dataQueue.get()

# def hello():
#     headers = {
#         "Connection": "keep-alive"
#     }
#     def generator():
#         for data in messages():
#             print(">>>>>>", data)
#             yield f"data: {json.dumps(data)}\n\n"
#     return Response(generator(), mimetype="text/event-stream", headers=headers)

def push():
    def generate():
        while True:
            if not dataQueue.empty():
                yield f"data: {json.dumps(dataQueue.get())}\n\n"
    return Response(generate(), mimetype="text/event-stream")

# def stream():
#     @stream_with_context
#     def generate_stream():
#         data = dataQueue.get()
#         print(">>>",data)
#         yield f"data: {json.dumps(data)}\n\n"
#     return current_app.response_class(
#         generate_stream(),
#         mimetype="text/event-stream"
#     )

def s(data):
    print(data)
