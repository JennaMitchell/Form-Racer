const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./vars.env" });
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// Get Requests

app.get("/input_data", (req, res) => {
  const query = `SELECT * FROM input_question_data INNER JOIN input_question_props ON input_question_data.input_question_data_id  = input_question_props.input_question_data_id_ref`;

  db.query(query, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.get("/limit_input_data:questionLimit", (req, res) => {
  const limit = req.params.questionLimit;
  const query = `SELECT * FROM input_question_data INNER JOIN input_question_props ON input_question_data.input_question_data_id  = input_question_props.input_question_data_id_ref LIMIT ?`;

  db.query(query, [+limit], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/multiple_choice_data", (req, res) => {
  const query = "SELECT * FROM multiple_choice_question_data";

  db.query(query, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.get("/limit_multiple_choice_data:questionLimit", (req, res) => {
  const query = "SELECT * FROM  multiple_choice_question_data LIMIT ?";
  const limit = req.params.questionLimit;

  db.query(query, [+limit], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/date_data", (req, res) => {
  const query = "SELECT * FROM date_question_data";

  db.query(query, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.get("/limit_date_data:questionLimit", (req, res) => {
  const query = "SELECT * FROM date_question_data LIMIT ?";
  const limit = req.params.questionLimit;

  db.query(query, [+limit], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/color_questions", (req, res) => {
  const query = "SELECT * FROM color_question_data";

  db.query(query, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.get("/limit_color_questions:questionLimit", (req, res) => {
  const query = "SELECT * FROM color_question_data LIMIT ?";
  const limit = req.params.questionLimit;

  db.query(query, [+limit], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/checkbox_questions", (req, res) => {
  const query = "SELECT * FROM checkbox_question_data";

  db.query(query, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.get("/limit_checkbox_questions:questionLimit", (req, res) => {
  const query = "SELECT * FROM checkbox_question_data LIMIT ?";
  const limit = req.params.questionLimit;

  db.query(query, [+limit], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.get("/slider_questions", (req, res) => {
  const query = "SELECT * FROM slider_question_data";

  db.query(query, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.get("/limit_slider_questions:questionLimit", (req, res) => {
  const query = "SELECT * FROM slider_question_data LIMIT ?";
  const limit = req.params.questionLimit;

  db.query(query, [+limit], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/", (req, res) => {
  console.log("entered");
  res.json("hello");
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
