import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
MODEL_PATH = os.path.join(BASE_DIR, "model", "ChronicKidney.h5")

ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

IMG_HEIGHT = 250
IMG_WIDTH = 250