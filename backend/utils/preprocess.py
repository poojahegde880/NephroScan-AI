import tensorflow as tf
from tensorflow import keras
from config import IMG_HEIGHT, IMG_WIDTH

def preprocess_image(image_path):

    img = keras.preprocessing.image.load_img(
        image_path,
        target_size=(IMG_HEIGHT, IMG_WIDTH)
    )

    img_array = keras.preprocessing.image.img_to_array(img)

    img_array = tf.expand_dims(img_array, 0)

    return img_array