const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const db = require("./database/config");
const app = express();
const port = 3000;

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", routes);

mongoose.connect(db.uri);
const database = mongoose.connection;

database.once("connected", () => {
  console.log("Database Connected");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
