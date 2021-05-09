import express from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import knex from "knex";

// -- endpoint function from controller
import handleRegister from "./controller/handleRegister.js";
import handleSignin from "./controller/handleSignin.js";
import handleProfile from "./controller/handleProfile.js";
import handleImage from "./controller/handleImage.js";
import handleClarifaiAPI from "./controller/handleClarifaiAPI.js";

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

// setup custom port
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("this is working"));

// Sign In POST
app.post("/signin", (req, res) => handleSignin(req, res, db, bcrypt));

// Register POST
app.post("/register", (req, res) => handleRegister(req, res, db, bcrypt));

// --Profile GET--
app.get("/profile/:id", (req, res) => handleProfile(req, res, db));

// -- image entries PUT --
app.put("/image", (req, res) => handleImage(req, res, db));

// --Clarifai API call
app.post("/imageURL", (req, res) => handleClarifaiAPI(req, res));

app.listen(PORT, () => {
  console.log(`app is running at port ${PORT}`);
});

//   / --> res = this is working
//   /signin --> POST = success/fail
//   /register --> POST = user(obj)
//   /profile/:userID --> GET = user(obj)
//   /image  --> PUT --> user rank