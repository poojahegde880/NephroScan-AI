import os
import mysql.connector

db = mysql.connector.connect(
    host=os.getenv("MYSQLHOST"),
    user=os.getenv("MYSQLUSER"),
    password=os.getenv("MYSQLPASSWORD"),
    database=os.getenv("MYSQLDATABASE"),
    port=int(os.getenv("MYSQLPORT"))
)

cursor = db.cursor(dictionary=True)

cursor.execute("""
CREATE TABLE IF NOT EXISTS patient_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    report_id VARCHAR(50),
    patient_name VARCHAR(255),
    age INT,
    gender VARCHAR(20),
    blood_pressure VARCHAR(20),
    creatinine VARCHAR(20),
    hemoglobin VARCHAR(20),
    albumin VARCHAR(20),
    sugar VARCHAR(20),
    prediction VARCHAR(50),
    confidence FLOAT,
    risk_level VARCHAR(20),
    original_image VARCHAR(255),
    gradcam_image VARCHAR(255),
    pdf_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

db.commit()

print("✅ Database connected.")
print("✅ patient_history table ready.")