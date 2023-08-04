const generalFunctions = require("../middlewear/general-function");
const mysql = require("mysql2");

exports.getLeaderboardData = async (req, res) => {
  const dbConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

  const database = req.params.database;
  const validDatabase = generalFunctions.validDatabaseCheck(
    database,
    "leaderboard_data"
  );

  if (!validDatabase) {
    return res.send("Not Valid Database");
  }

  const query = `SELECT * FROM ${database} ORDER BY ranking ASC`;

  dbConnection.connect((err) => {
    if (err) throw err;
    console.log("MYSQL CONNECTED");
  });

  dbConnection.query(query, (err, data) => {
    if (err) return res.send(err);

    return res.json(data);
  });
  dbConnection.end((err) => {
    if (err) throw err;
    console.log("MYSQL DISCONNECTED");
  });
};

exports.updateLeaderboardData = (req, res) => {
  const dbConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

  const database = req.params.database;

  const validDatabase = generalFunctions.validDatabaseCheck(
    database,
    "leaderboard_data"
  );

  if (!validDatabase) {
    return res.send("Not Valid Database");
  }
  const queryData = req.body;

  const query = `UPDATE ${database} SET username = '${
    queryData.username
  }', users_time = '${
    queryData.users_time
  }', ranking = '${+queryData.ranking}' WHERE ranking = ${+queryData.ranking}`;

  dbConnection.connect((err) => {
    if (err) throw err;
    console.log("MYSQL CONNECTED");
  });

  dbConnection.query(query, (err, data) => {
    if (err) return res.send(err);
    console.log(data);
    return res.json(data);
  });
  dbConnection.end((err) => {
    if (err) throw err;
    console.log("MYSQL DISCONNECTED");
  });
};
