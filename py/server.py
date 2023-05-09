from flask import jsonify, request
from flask import Flask
from flask_cors import cross_origin
from inspect import getmembers, isfunction
import functions

app = Flask(__name__)

@cross_origin()
@app.route("/getFunctions")
def getFunctions():
    funcList = []
    for func in getmembers(functions, isfunction):
        funcList.append(func[0])

    return jsonify(funcList)

if __name__ == "main":
    app.run(host='127.0.0.1', port=5002)