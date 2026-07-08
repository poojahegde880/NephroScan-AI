from db import get_db
from flask import Blueprint, request, jsonify
import os
from werkzeug.utils import secure_filename

from config import UPLOAD_FOLDER, ALLOWED_EXTENSIONS
from model_loader import model
from utils.preprocess import preprocess_image
from utils.predict_model import predict

# NEW
from gradcam.gradcam import (
    get_last_conv_layer,
    generate_gradcam,
    save_gradcam,
)

predict_bp = Blueprint("predict", __name__)


def allowed_file(filename):
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )


@predict_bp.route("/api/predict", methods=["POST"])
def predict_api():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type"}), 400

    filename = secure_filename(file.filename)

    filepath = os.path.join(UPLOAD_FOLDER, filename)

    file.save(filepath)

    # Preprocess image
    image = preprocess_image(filepath)

    # Prediction
    prediction, confidence = predict(model, image)

    # -------- Grad-CAM --------
    last_conv = get_last_conv_layer(model)

    heatmap = generate_gradcam(
        model,
        image,
        last_conv,
    )

    gradcam_filename = f"gradcam_{filename}"

    gradcam_path = os.path.join(
        UPLOAD_FOLDER,
        gradcam_filename,
    )

    save_gradcam(
        filepath,
        heatmap,
        gradcam_path,
    )

    import time

    report_id = f"P-{int(time.time())}"

    risk_level = "High" if prediction in ["CKD", "Chronic"] else "Low"

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        INSERT INTO patient_history (
            report_id,
            patient_name,
            age,
            gender,
            blood_pressure,
            creatinine,
            hemoglobin,
            albumin,
            sugar,
            prediction,
            confidence,
            risk_level,
            original_image,
            gradcam_image,
            pdf_name
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """, (
        report_id,
        request.form.get("name"),
        request.form.get("age"),
        request.form.get("gender"),
        request.form.get("bloodPressure"),
        request.form.get("creatinine"),
        request.form.get("hemoglobin"),
        request.form.get("albumin"),
        request.form.get("sugar"),
        prediction,
        round(confidence, 2),
        risk_level,
        filename,
        gradcam_filename,
        ""
    ))

    db.commit()

    cursor.close()
    db.close()

    return jsonify({
        "prediction": prediction,
        "confidence": round(confidence, 2),
        "gradcam": gradcam_filename,
        "image": filename
    })
