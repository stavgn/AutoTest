import pika
import json
import uuid


class MessageDispatcher():
    def __init__(self, queueUrl, queueName):
        self.queueName = queueName
        self.connection = pika.BlockingConnection(
            pika.ConnectionParameters(queueUrl))
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue=queueName)

    def dispatch(self, message):
        message['id'] = str(uuid.uuid4())
        print(message)
        self.channel.basic_publish(
            exchange='',
            routing_key=self.queueName,
            body=json.dumps(message)
        )
        return message['id']
