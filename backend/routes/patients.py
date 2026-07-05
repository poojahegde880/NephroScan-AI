from flask import Blueprint, jsonify
from db import cursor

patients_bp = Blueprint("patients", __name__)

@patients_bp.route("/api/patients", methods=["GET"])
def get_patients():

    cursor.execute("""
        SELECT *
        FROM patient_history
        ORDER BY created_at DESC
    """)

    patients = cursor.fetchall()

    return jsonify(patients)