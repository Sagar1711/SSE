import threading
import requests as req
import time

def target_func(status):
    data = {
        "name": "process_a",
        "status": status
    }
    req.put('http://172.31.0.20:3000/process', json=data, verify=False)

def call_update():
    th = []
    for i in range(10):
        # time.sleep(1)
        t = threading.Thread(target=target_func, args=(str(i), ))
        th.append(t)
        t.start()
    for i in th:
        i.join()

if __name__ == "__main__":
    call_update()
