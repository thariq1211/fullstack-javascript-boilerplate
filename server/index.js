const express = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 31045;

app.use(morgan("common"));
app.use(express.static(path.join(__dirname, "../app/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/build/index.html"));
});

const server = https.createServer(
  {
    key: fs.readFileSync("./cert/server.key"),
    cert: fs.readFileSync("./cert/server.crt"),
  },
  app
);

server.listen(port, () => {
  console.log(`[${process.pid}] server up`);
});
