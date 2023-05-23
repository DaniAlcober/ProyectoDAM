from flask import jsonify, request
from flask import Flask
from flask_cors import cross_origin
from inspect import getmembers, isfunction
#import functions, maths, strings
import json
import sys
import importlib

app = Flask(__name__)

@cross_origin()
@app.route("/getFunctions")
def getFunctions():
    fileName = request.args.get('file')
    fileModule = importlib.import_module(fileName)
    #fileModule = getattr(sys.modules[__name__], fileName)
    

    dict_list = []
    for func in getmembers(fileModule, isfunction):
        dictionary = {}
        dictionary.update({"name": func[0]})
        dictionary.update({"parameters":getattr(fileModule, func[0]).__code__.co_varnames})
        dictionary.update({"file": fileName})
        dict_list.append(dictionary)

    json_object = json.dumps(dict_list)
    return json_object

@cross_origin()
@app.route("/runFunction")
def runFunction():
    fileName = request.args.get('file')
    fileModule = importlib.import_module(fileName)
    functionName = request.args.get('function')
    functionCall = getattr(fileModule, functionName)
    a = request.args.get('a')
    b = request.args.get('b')

    result = functionCall(float(a), float(b))

    return jsonify(result)
    
if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5002)