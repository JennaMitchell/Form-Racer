const express = require("express");

const cors = require("cors");
const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "./vars.env" });

const questionDataRoutes = require("./routes/question-data-routes");
const leaderboardDataRoutes = require("./routes/leaderboard-router");
const port = process.env.PORT || 8800;

app.use(cors());
app.use(express.json());

app.use("/question-data", questionDataRoutes);

app.use("/leaderboard-data", leaderboardDataRoutes);

// Leader Board

app.listen(port, () => {
  console.log("Connected to backend.");
});
