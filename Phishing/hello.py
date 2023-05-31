from flask import Flask, request
import dataset_generate as dg
import csrf as cf
import dsss as ds

app = Flask(__name__)


@app.route("/detect", methods=["POST"])
def phishing():
    data = request.get_json()
    url = data["url"]
    result = dg.predict(url)
    print(result)
    if result == 0:
        return "Phishing"
    elif result == 1:
        return "Legitimate"
    else:
        return "Error"


@app.route("/csrf", methods=["POST"])
def csrf():
    data = request.get_json()
    url = data["url"] + "/"
    result = cf.xsrfprobe(url)
    print(result)
    if result == 0:
        return "Not Vulnerable"
    elif result >= 1:
        return "Vulnerable"
    else:
        return "Error"

@app.route("/sqli", methods=["POST"])
def sqli():
    data = request.get_json()
    url = data["url"]
    result = ds.scan_page(url)
    if result == false:
        return "Not Vulnerable"
    elif result == true:
        return "Vulnerable"
    else:
        return "Error"