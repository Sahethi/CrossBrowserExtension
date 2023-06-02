from flask import Flask, request
import Phishing.dataset_generate as dg
import CSRF.csrf as cf
import SQLi.dsss as ds
import signal


def timeout_handler(signum, frame):
    raise TimeoutError("Timeout occurred.")


def run_with_timeout(func, timeout_seconds):
    # Set the signal handler
    signal.signal(signal.SIGALRM, timeout_handler)
    # Set the alarm signal to raise after the specified timeout
    signal.alarm(timeout_seconds)

    try:
        # Run the function
        result = func()
        # Cancel the alarm signal
        signal.alarm(0)
        # Return the result
        return result
    except TimeoutError:
        print("Timeout occurred.")
        # Handle the timeout case


app = Flask(__name__)


@app.route("/detect", methods=["POST"])
def result():
    data = request.get_json()
    print(data)
    url = data["url"]
    result = []
    result_phishing = 1
    result_phishing=(dg.predict(url))
    print(result_phishing)
    if result_phishing == -1:
        result.append("Phishing")
    elif result_phishing == 1:
        result.append("Legitimate (No Phishing)")
    result_csrf = cf.xsrfprobe(url)
    print(result_csrf)
    if result_csrf == 0:
        result.append("Not Vulnerable to CSRF")
    elif result_csrf >= 1:
        result.append("Vulnerable to CSRF")
    result_sqli = ds.scan_page(url)
    print(result_sqli)
    if result_sqli == 0:
        result.append("Not Vulnerable to SQLi")
    elif result_sqli == 1:
        result.append("Vulnerable to SQLi")
    return str(result)


# @app.route("/csrf", methods=["POST"])
# def csrf():
#     data = request.get_json()
#     url = data["url"] + "/"
#     result = cf.xsrfprobe(url)
#     print(result)
#     if result == 0:
#         return "Not Vulnerable"
#     elif result >= 1:
#         return "Vulnerable"
#     else:
#         return "Error"


# @app.route("/sqli", methods=["POST"])
# def sqli():
#     data = request.get_json()
#     url = data["url"]
#     result = ds.scan_page(url)
#     if result == 0:
#         return "Not Vulnerable"
#     elif result == 1:
#         return "Vulnerable"
#     else:
#         return "Error"
