#!flask/bin/python
from flask import Flask, jsonify, request
import json
app = Flask(__name__)

@app.route('/datos', methods=['POST'])
def recibir_datos():
	print request.json['metodo']
	print request.json['numeros']
	return "Hola desde Python!", 201

if __name__ == "__main__":
	app.run(host="192.168.50.13",port=8082)
