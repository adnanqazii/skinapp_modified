# load Flask 
import flask
from tensorflow import keras
import cv2 as cv2
import numpy as np
import pandas as pd
from flask import url_for
from flask_cors import CORS
import json
app = flask.Flask(__name__)
CORS(app)
# define a predict function as an endpoint 
print(__name__)

# @app.route("/predict", methods=["GET","POST"])
# def predict():
#     data = {"success": False}
#     return 'bgf'
#     # get the request parameters
#     params = flask.request.json
   
#     if (params == None):
#         params = flask.request.args
#     # if parameters are found, echo the msg parameter 
#     if (params != None):
#         data["response"] = params.get("msg")
#         data["success"] = True
#     # return a response in json format 
    
#     return 'flask.jsonify(data)'

model=keras.models.load_model('./weights-021-0.9999.hdf5')
@app.route('/upload', methods=['POST'])
def upload():
    try:
            #read image file string data
        filestr = flask.request.files['image'].read()
        #convert string data to numpy array
        file_bytes = np.fromstring(filestr, np.uint8)
        # convert numpy array to image
        img = cv2.imdecode(file_bytes, cv2.IMREAD_REDUCED_COLOR_2)
        img=cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
       
      
        img_size=(300, 300)
       
        img=cv2.resize(img, img_size)    
        img=np.expand_dims(img, axis=0)
        p= np.squeeze (model.predict(img))
        index=np.argmax(p)  
        class_df=pd.read_csv('./class_dict (1).csv')          
        prob=p[index]
        classname=class_df['class'].iloc[index]
        print(classname,prob)
        data = {'classname': classname, 'prob': str(prob)}
        json_data = json.dumps(data)
        headers = {'Content-Type': 'application/json'}
        return json_data, 200, headers
        # return flask.jsonify(classname=classname,prob=str(prob))
    except Exception as err:
        print('error',err)
# start the flask app, allow remote connections
app.run(host='0.0.0.0')