from routes.patients import patients_bp
from config import UPLOAD_FOLDER
from flask import Flask, send_from_directory
from flask_cors import CORS
import os

from routes.predict import predict_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(predict_bp)
app.register_blueprint(patients_bp)


@app.route("/")
def home():
    return {"message": "NephroScan AI Backend Running 🚀"}


# Serve uploaded images (original + Grad-CAM)

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(
        UPLOAD_FOLDER,
        filename
    )
if __name__ == "__main__":
    app.run(debug=True)