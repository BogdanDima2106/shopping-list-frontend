import * as tf from "@tensorflow/tfjs";

// Maparea iconițelor pe categorii
const iconMapping = {
  LocalDrink: 0,
  Fastfood: 1,
  Laptop: 2,
  Checkroom: 3,
};

// Funcție pentru a prelucra numele produselor într-un vector simplu
const textToVector = (text, vocab) => {
  const vector = Array(vocab.size).fill(0);
  text
    .toLowerCase()
    .split("")
    .forEach((char) => {
      if (vocab.has(char)) {
        vector[vocab.get(char)] += 1;
      }
    });
  return vector;
};

// Funcția de antrenare a modelului
export const trainModel = async (data) => {
  const vocab = new Map();
  let index = 0;

  // Construim vocabularul din caractere
  data.forEach((item) => {
    item.name
      .toLowerCase()
      .split("")
      .forEach((char) => {
        if (!vocab.has(char)) {
          vocab.set(char, index++);
        }
      });
  });

  // Pregătim datele de intrare și ieșire
  const X = tf.tensor2d(data.map((item) => textToVector(item.name, vocab)));
  const y = tf.oneHot(
    data.map((item) => iconMapping[item.icon]),
    Object.keys(iconMapping).length
  );

  // Creăm modelul
  const model = tf.sequential();
  model.add(
    tf.layers.dense({ units: 16, activation: "relu", inputShape: [vocab.size] })
  );
  model.add(
    tf.layers.dense({
      units: Object.keys(iconMapping).length,
      activation: "softmax",
    })
  );

  model.compile({
    optimizer: "adam",
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });

  // Antrenăm modelul
  await model.fit(X, y, { epochs: 10 });

  return { model, vocab };
};

// Funcția de predicție
export const predictIcon = (model, vocab, productName) => {
  const inputVector = tf.tensor2d([textToVector(productName, vocab)]);
  const prediction = model.predict(inputVector);
  const predictedIndex = prediction.argMax(-1).dataSync()[0];
  return Object.keys(iconMapping).find(
    (key) => iconMapping[key] === predictedIndex
  );
};
