import os
import numpy as np
from flask import Flask, jsonify, request
from PIL import Image
from tensorflow.keras.models import load_model
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['ALLOWED_EXTENSIONS']= set(['png', 'jpg', 'jpeg'])
app.config['MODEL_FILE']='image_class.h5'
app.config['LABELS_FILE']='labels.txt'
app.config['UPLOAD_FOLDER']='uploads/'

model = load_model(app.config['MODEL_FILE'], compile=False)
with open(app.config['LABELS_FILE'], 'r')as file:
    labels=file.read().splitlines()

def file_allowed(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in app.config['ALLOWED_EXTENSIONS']

def image_predict(image):
    img=Image.open(image).convert("RGB")
    img=img.resize((224,224))
    img_array=np.asarray(img)
    img_array=np.expand_dims(img_array, axis=0)
    normalized_image_array=(img_array.astype(np.float32)/127.5)-1
    data=np.ndarray(shape=(1,224,224,3), dtype=np.float32)
    data[0]=normalized_image_array
    predictions=model.predict(data)
    index=np.argmax(predictions)
    class_name=labels[index]
    score_accuracy = predictions[0][index]
    return class_name[0:], score_accuracy


@app.route("/")
def index():
    return jsonify({
        "status":{
            "code": 200,
            "message": "Success"
            },
            "data": "Hello World"
        }), 200

@app.route("/class", methods=["POST"])
def class_route():
    if request.method == "POST":
        image = request.files["image"]
        if image and file_allowed(image.filename):
            filename = secure_filename(image.filename)
            image.save(os.path.join(app.config["UPLOAD_FOLDER"], filename))
            image_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)

            class_name, score_accuracy = image_predict(image_path)

            return jsonify({
                "status": {
                    "code": 200,
                    "message": "Success"
                },
                "data":{
                    "image_prediction": class_name,
                    "accuracy": float(score_accuracy),
                }
            }), 200
        else:
            return jsonify({
                "status":{
                    "code": 400,
                    "message": "Invalid file format. Please upload with image format."
                },
                "data": None,
            }), 400
    else:
        return jsonify({
            "status":{
                "code": 405,
                "message": "Method not allowed."
            },
            "data": None
        }), 405

if __name__ == "__main__":
    app.run