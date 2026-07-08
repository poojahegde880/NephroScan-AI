from flask import Blueprint, jsonify
from db import cursor

patients_bp = Blueprint("patients", __name__)

@patients_bp.route("/api/patients", methods=["GET"])
def get_patients():

    if not db.is_connected():
    db.reconnect(attempts=3, delay=2)

    cursor.execute("""
        SELECT *
        FROM patient_history
        ORDER BY created_at DESC
    """)

    patients = cursor.fetchall()

    return jsonify(patients)