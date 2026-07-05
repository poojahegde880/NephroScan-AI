import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",      # Change this if your MySQL root user has a password
    database="nephroscan"
)

cursor = db.cursor(dictionary=True)

print("✅ Connected to MySQL successfully!")