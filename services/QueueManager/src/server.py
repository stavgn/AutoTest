from flask import Flask, make_response, jsonify, request
from messageDispatcher import MessageDispatcher

dispatcher = MessageDispatcher()
app = Flask(__name__)


@app.route('/emit', methods=['POST'])
def emit():
    message = request.get_json()
    id = dispatcher.dispatch()
    return make_response(jsonify({'id': id}), 201)


app.run()
