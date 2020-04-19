from flask import Response, stream_with_context, current_app
import time
import json
from connexapi.models.process import dataQueue
from queue import Queue

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
subscriptions = []


def push():
    def generate():
        while True:
            if not dataQueue.empty():
                yield f"data: {json.dumps(dataQueue.get())}\n\n"
    return Response(generate(), mimetype="text/event-stream")


def notify(message):
    for subscription in subscriptions:
        subscription.put(message)

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

def yield_data(subscription):
    while True:
        if not subscription.empty():
            data = subscription.get()
            if data.get('event') == 'close':
                raise GeneratorExit
            else:
                yield data


def event_stream():
    """Generate an event stream."""
    subscription = Queue()
    subscriptions.append(subscription)

    # Send a comment line to prevent request timeouts
    iterQueue = yield_data(subscription)
    try:
        for event in iterQueue:
            yield f"data: {event}\n\n"
    except GeneratorExit:
        print("removing")
        subscriptions.remove(subscription)

def stream():
    """Generate an event stream.

    Returns:
        Status code 200 as events are generated successfully.
    """
    return Response(event_stream(), mimetype='text/event-stream')


def debug():
    """Show a count of subscriptions.
    Returns:
        Status code 200 if a subscription count is returned successfully.
    """
    return "Current subscription count: {}".format(len(subscriptions))
