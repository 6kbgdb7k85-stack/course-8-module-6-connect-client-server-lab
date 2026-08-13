from flask import Flask, jsonify, request
from flask_cors import CORS

from data import Event

events = [
    Event(0,"Event 1"),
    Event(0,"Event 2")
]

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def index():
    return jsonify({"message":"Welcome"}), 200

@app.route("/events",methods=["GET"])
def get_events():
    return jsonify([e.to_dict() for e in events]), 200

@app.route("/events",methods=["POST"])
def create_event():
    global events
    data = request.get_json()
    if "title" not in data:
        return jsonify({"message":"Field 'title' is required"}), 400
    new_id = max((e.id for e in events), default=0) + 1
    new_event = Event(id=new_id, title=data["title"])
    events.append(new_event)
    return jsonify(new_event.to_dict()), 201

if __name__ == "__main__":
    app.run(debug=True)
