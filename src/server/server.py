import json
import logging

from flask_restful import Api, Resource, fields, marshal, reqparse

from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from flask_httpauth import HTTPBasicAuth

app = Flask(__name__, static_url_path="")
api = Api(app)
auth = HTTPBasicAuth()
file_handler = logging.FileHandler('server.log')
app.logger.addHandler(file_handler)
app.logger.setLevel(logging.INFO)
CORS(app)

with open("server_config.json") as f:
    config = json.load(f)


dummy_response = {
    'refVideos': [
        "injecting/yt-4h2HCo6UNFE_796.mp4",
        "working/flickr-0-3-0-6-4-6-5-1-5603064651_1.mp4",
        "bicycling/flickr-9-9-0-9-7-4-9-7-3599097497_19.mp4",
    ],
    'rankVideos': [
        "cooking/flickr-2-9-3-9-2-8-3-8-4129392838_11.mp4",
        "competing/6-4-6-7739315646.mp4",
        "injecting/yt-4h2HCo6UNFE_796.mp4",
        "working/flickr-0-3-0-6-4-6-5-1-5603064651_1.mp4",
        "bicycling/flickr-9-9-0-9-7-4-9-7-3599097497_19.mp4",
    ]
}


class WorkerId(Resource):

    def get(self):
        # TODO: Add logic for distributing HIT data to workers.
        req_data = request.args.get('workerId')
        print(req_data)
        res = jsonify(dummy_response)
        return res


class TaskResponse(Resource):

    def post(self):
        # TODO: Save exp data to db and return feedback to worker.
        task_data = request.get_json()
        print(task_data)
        return {'vigilanceHitRate': 8 / 10}


api.add_resource(WorkerId, '/workerId')
api.add_resource(TaskResponse, '/response')

if __name__ == '__main__':
    app.run(host='localhost', port=config['port'], debug=True)
    # app.run(host='0.0.0.0', port=config['port'], debug=True,
    # ssl_context=(config['sslContext']['cert'],
    #  config['sslContext']['privKey']))
