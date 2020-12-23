// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3000;
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

//start of routes
app.get("/getData", (req, res) => {
  const data = projectData;
  try {
    res.send(data);
  } catch (e) {
    res.status(404).send({ message: "somthing worng happened" });
  }
});

app.post("/postData", async (req, res) => {
  const { temperature = "", date = "", feelings = "" } = await req.body;
  projectData = { temperature, date, feelings };
  try {
    res.send(projectData);
  } catch (e) {
    res.send({ message: "somthing worng happened" });
  }
});

// Setup Server

app.listen(port, () => {
  console.log(`server is up and running on http://localhost:${port}`);
});
