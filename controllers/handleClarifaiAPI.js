import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: process.env.API_CLARIFAI,
});

const handleClarifaiAPI = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("API error"));
};

export default handleClarifaiAPI;