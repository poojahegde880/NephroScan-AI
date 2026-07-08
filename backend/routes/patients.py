from flask import Blueprint, jsonify
from db import get_db

patients_bp = Blueprint("patients", __name__)


@patients_bp.route("/api/patients", methods=["GET"])
def get_patients():

    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM patient_history
        ORDER BY created_at DESC
    """)

    patients = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify(patients)