from flask import Flask
from flask_restful import Resource, Api
import requests, json
from flask import request
import pickle
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np 
import preprocessing as pp

app = Flask(__name__)
api = Api(app)

with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)
new_model = load_model('model')
print(new_model)

class Predict(Resource):
    def put(self):
        text = request.form['text']
        text = pp.conduct_preprocessing(text)
        x = tokenizer.texts_to_sequences(np.array([text]))
        x = pad_sequences(x, maxlen=100)
        prediction = new_model.predict(x)
        prediction_response = {'prediction': float(prediction)}
        return prediction_response

api.add_resource(Predict, '/predict')

@app.route("/")
def hello_world():
    return "<p>Fake news classifier</p><p>Use endpoint '\\predict' to check your text</p><p>in python: put('https://fakenews-pnw-app.herokuapp.com/predict', data={'text': 'THIS IS ALL A LIE'}).json() </p><p>or https://fakenews-pnw-app.herokuapp.com/predict-via-url?text=aaaa</p>"

@app.route("/predict-via-url", methods=['GET'])
def api():
    if request.method == 'POST' or request.method == 'GET':
        text = request.args.get('text')
        text = pp.conduct_preprocessing(text)
        x = tokenizer.texts_to_sequences(np.array([text]))
        x = pad_sequences(x, maxlen=100)
        prediction = new_model.predict(x)
        prediction_response = {'prediction': float(prediction)}
        return prediction_response