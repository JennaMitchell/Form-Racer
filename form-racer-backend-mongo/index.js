const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();

const questionRoutes = require("./routes/questions-routes");
const scoreboardRoutes = require("./routes/scoreboard-routes");
const cors = require("cors");

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    return {
      message: "Server Error",
      error: [{ error: err }],
      status: 401,
    };
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(cors());
app.use(express.json());

app.use("/questions", questionRoutes);
app.use("/scoreboards", scoreboardRoutes);

app.listen(process.env.PORT, () => {
  console.log(5000);
});
