import tensorflow as tf

CLASS_NAMES = ["Chronic", "Normal"]

def predict(model, image):

    predictions = model.predict(image)

    score = tf.nn.softmax(predictions[0])

    predicted_class = CLASS_NAMES[tf.argmax(score).numpy()]

    confidence = min(float(tf.reduce_max(score) * 100), 99.99)

    return predicted_class, confidence