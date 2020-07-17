from __future__ import print_function
import sys
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from bs4 import BeautifulSoup
import urllib2
import re
import json
import logging
import os


flask_app = Flask(__name__, static_folder='./build', static_url_path='/')
CORS(flask_app)

@flask_app.route('/')
def index():
    return flask_app.send_static_file('index.html')

@flask_app.route("/api", methods=['GET', 'POST'])
@cross_origin()

def home():
    data = request.json
    # print("hello", file=sys.stderr)

    if request.method == 'POST' and isinstance(request.json, list):
        imageLinks = []
        links = request.json


        for link in links:

            try:
                html_page = urllib2.urlopen(link["url"])
                soup = BeautifulSoup(html_page)

                images = []
                for img in soup.findAll('img'):
                    currentImage = img.get("src")
                    if ".png" in currentImage or ".jpg" in currentImage:
                        images.append(img.get('src'))

                # Change me to better image
                imageLinks.append(images[0])

            except Exception as e:
                print(e, file=sys.stderr)
                imageLinks.append("error")


        # print(imageLinks, file=sys.stderr)
        return jsonify({"return":imageLinks})

            # if len(images) > 0:
            #     return jsonify({"return":images[0]})
            #
            # else:
            #     #print("error getting image", file=sys.stderr)
            #     return jsonify({"return":"error"})

        # return jsonify({"return":"error"})

    else:
        #print("error getting image", file=sys.stderr)
        return jsonify({"return":"error"})


if __name__ == "__main__":
    flask_app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 8080))
