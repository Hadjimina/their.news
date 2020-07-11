from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from bs4 import BeautifulSoup
import urllib2
import re
import json
import logging


app = Flask(__name__)
CORS(app)

@app.route("/api", methods=['GET', 'POST'])
@cross_origin()

def home():
    # app.logger.info(json.dumps(request.method))
    data = request.json
    # app.logger.info(data["url"])
    if request.method == 'POST' and "url" in request.json:
        try:
            html_page = urllib2.urlopen(request.json["url"])
            soup = BeautifulSoup(html_page)



            images = []
            for img in soup.findAll('img'):
                currentImage = img.get("src")
                if ".png" in currentImage or ".jpg" in currentImage:
                    images.append(img.get('src'))
                    # app.logger.info(img.get('src'))
        except:
            return jsonify({"return":"error"})

        if len(images) > 0:
            app.logger.info(images[0])
            return jsonify({"return":images[0]})
        else:
            app.logger.info("invalid")
            return jsonify({"return":"error"})
    else:
        app.logger.info("invalid")
        return jsonify({"return":"error"})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
