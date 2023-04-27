from flask import Flask, request
import dataset_generate as dg
app = Flask(__name__)


@app.route('/detect', methods=['POST'])
def phishing():
    url = request.form['url']
    result = dg.predict(url)
    if result == 0:
        return "Phishing"
    elif result == 1:
        return "Legitimate"