import mysql.connector

db = mysql.connector.connect(
    host="hayabusa.proxy.rlwy.net",
    user="root",
    password="UjuhymWtkIEoQBAHrbZrehMEazWVLKOU",
    database="railway",
    port=39299
)

cursor = db.cursor()

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
    pdf_name VARCHAR(255)
);
""")

db.commit()

print("✅ patient_history table created successfully!")