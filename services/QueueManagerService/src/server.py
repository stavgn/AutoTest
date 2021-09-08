from os import environ
from flask import Flask, make_response, jsonify, request
from messageDispatcher import MessageDispatcher
from time import sleep


queueUrl = environ.get('QUEUE_URL') or 'localhost'
queueName = environ.get('QUEUE_NAME') or 'default'

if environ.get('FLASK_ENV') != 'development':
    sleep(15)

dispatcher = MessageDispatcher(queueUrl, queueName)
app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return make_response(jsonify(
        {'QUEUE_URL': queueUrl,
         'QUEUE_NAME': queueName
         }
    ))


@app.route('/emit', methods=['POST'])
def emit():
    message = request.get_json()
    id = dispatcher.dispatch(message)
    return make_response(jsonify({'id': id}), 201)
