import * as tf from "@tensorflow/tfjs-node";

// If using env please uncomment an object with value process.env.* and
// comment an object with value GCS public URL
const modelURL = {
  // singkong: process.env.MODEL_URL_MAIZE,
  // jagung: process.env.MODEL_URL_MAIZE
  singkong: "https://storage.googleapis.com/crop-care-model/cassava/model.json",
  jagung: "https://storage.googleapis.com/crop-care-model/maize/model.json"
};
const backupFile = {
  singkong: "file://model/cassava/model.json",
  jagung: "file://model/maize/model.json"
};

const models = {};

async function loadModel(type) {
  try {
    console.log(`Loading model: ${type}`);
    console.log(modelURL[type]||backupFile[type]);
    models[type] = await tf.loadLayersModel(/*modelURL[type]||*/backupFile[type]);
    // models[type].summary();
    console.log(`Model ${type} loaded successfully`);
  } catch (err) {
    console.error(err)
    throw new Error("Model file is corrupted or unsupport");
  }
}

async function ensureModelLoaded(type=null) {
  try {
    if (!models) {
      await loadAllModels();
      console.log("Models loaded successfully.");
    } else if (!models[type]) {
      await loadModel(type);
    }
    console.log("Models have been load");
  } catch (error) {
    console.error("Error loading models:", error);
    throw error;
  }
}  

export async function loadAllModels() {
  await Promise.all([loadModel("singkong"), loadModel("jagung")]);
  console.log("Model has been loaded");
}

export async function getModel(type) {
  await ensureModelLoaded(type)
  return models[type];
}

await loadAllModels();
