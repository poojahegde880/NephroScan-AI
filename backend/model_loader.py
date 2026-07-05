import os
import tensorflow as tf
from tensorflow.keras import layers, Model

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "model",
    "ChronicKidney.h5"
)

print("Loading AI model...")


def build_model():

    inputs = tf.keras.Input(shape=(250, 250, 3))

    x = layers.Rescaling(1.0 / 255)(inputs)

    x = layers.Conv2D(
        16,
        3,
        padding="same",
        activation="relu"
    )(x)

    x = layers.MaxPooling2D()(x)

    x = layers.Conv2D(
        32,
        3,
        padding="same",
        activation="relu"
    )(x)

    x = layers.MaxPooling2D()(x)

    x = layers.Conv2D(
        64,
        3,
        padding="same",
        activation="relu",
        name="last_conv"
    )(x)

    x = layers.MaxPooling2D()(x)

    x = layers.Flatten()(x)

    x = layers.Dense(
        128,
        activation="relu"
    )(x)

    outputs = layers.Dense(2)(x)

    return Model(inputs, outputs)


print("Step 1")

model = build_model()

print("Step 2")

model(tf.zeros((1, 250, 250, 3)))

print("Step 3")

old_model = tf.keras.models.load_model(
    MODEL_PATH,
    compile=False
)

print("Step 4")

model.set_weights(old_model.get_weights())
print("\n========== MODEL SUMMARY ==========")
model.summary()

print("\nInput Shape:", model.input_shape)
print("Output Shape:", model.output_shape)

print("\nLast Layer Config:")
print(model.layers[-1].get_config())
print("Step 5")
print("✅ Functional model loaded successfully!")