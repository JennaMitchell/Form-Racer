const generalFunctions = require("../middlewear/general-function");
const mysql = require("mysql2");

exports.getAllQuestionData = (req, res) => {
  let query = "";

  const validDatabase = generalFunctions.validDatabaseCheck(
    database,
    "question_data"
  );

  if (!validDatabase) {
    return res.send("Not Valid Database");
  }

  if (database === "input_question_data") {
    query = `SELECT * FROM input_question_data INNER JOIN input_question_props ON input_question_data.input_question_data_id  = input_question_props.input_question_data_id_ref`;
  } else {
    query = `SELECT * FROM ${database}`;
  }
  const dbConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

  dbConnection.connect((err) => {
    if (err) throw err;
  });

  dbConnection.query(query, (err, data) => {
    if (err) return res.send(err);

    return res.json(data);
  });
  dbConnection.end((err) => {
    if (err) throw err;
  });
};

exports.getQuestionDataWithLimit = (req, res) => {
  const requestData = JSON.parse(req.params.requestData);
  let query = "";
  const validDatabase = generalFunctions.validDatabaseCheck(
    requestData.database,
    "question_data"
  );

  if (!validDatabase) {
    return res.send("Not Valid Database");
  }
  const limit = requestData.limit;
  if (limit <= 0) {
    return res.send("Not Valid Limit");
  }

  if (requestData.database === "input_question_data") {
    query = `SELECT * FROM input_question_data INNER JOIN input_question_props ON input_question_data.input_question_data_id  = input_question_props.input_question_data_id_ref LIMIT ${requestData.limit}`;
  } else {
    query = `SELECT * FROM ${requestData.database} LIMIT ${requestData.limit}`;
  }
  const dbConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

  dbConnection.connect((err) => {
    if (err) throw err;
  });

  dbConnection.query(query, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
  dbConnection.end((err) => {
    if (err) throw err;
  });
};
