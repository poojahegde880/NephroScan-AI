import tensorflow as tf
import numpy as np
import cv2


def get_last_conv_layer(model):
    """
    Find the last Conv2D layer automatically.
    """
    for layer in reversed(model.layers):
        if isinstance(layer, tf.keras.layers.Conv2D):
            return layer.name

    raise ValueError("No Conv2D layer found.")

def generate_gradcam(model, image, last_conv_layer_name):

    image = tf.cast(image, tf.float32)

    grad_model = tf.keras.models.Model(
        inputs=model.input,
        outputs=[
            model.get_layer(last_conv_layer_name).output,
            model.output,
        ],
    )

    with tf.GradientTape() as tape:

        conv_outputs, predictions = grad_model(image, training=False)

        class_index = tf.argmax(predictions[0])

        loss = predictions[:, class_index]

    grads = tape.gradient(loss, conv_outputs)

    if grads is None:
        raise Exception("Gradients are None")

    pooled_grads = tf.reduce_mean(
        grads,
        axis=(0, 1, 2),
    )

    conv_outputs = conv_outputs[0]

    heatmap = tf.reduce_sum(
        pooled_grads * conv_outputs,
        axis=-1,
    )

    heatmap = tf.maximum(heatmap, 0)

    heatmap = heatmap / (tf.reduce_max(heatmap) + 1e-8)

    heatmap = cv2.resize(
        heatmap.numpy(),
        (250, 250),
    )

    return heatmap


def save_gradcam(image_path, heatmap, output_path):

    image = cv2.imread(image_path)

    image = cv2.resize(image, (250, 250))

    heatmap = np.uint8(255 * heatmap)

    heatmap = cv2.applyColorMap(
        heatmap,
        cv2.COLORMAP_JET,
    )

    overlay = cv2.addWeighted(
        image,
        0.6,
        heatmap,
        0.4,
        0,
    )

    cv2.imwrite(output_path, overlay)

    return output_path