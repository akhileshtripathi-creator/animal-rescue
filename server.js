const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public")); // serve frontend files

let rescueRequests = [];

// POST API to save rescue request
app.post("/rescue", (req, res) => {
  const { animalType, location, latitude, longitude } = req.body;

  // basic validation (optional)
  if (!animalType || !location || !latitude || !longitude) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const rescue = { animalType, location, latitude, longitude };
  rescueRequests.push(rescue);
  return res.json(rescue); // <-- must return JSON (not HTML)
});

// GET API to get all requests
app.get("/rescue", (req, res) => {
  res.json(rescueRequests);
});

app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);});