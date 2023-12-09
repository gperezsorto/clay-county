let express = require('express');
let db = require('./database.js');

// initialize express
let app = express();

const PORT = 3000;

// broad api route that pulls the entire database. Mostly used for testing.
app.get("/api/", (req, res, next) => {
  let sql = "SELECT * FROM data";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.json(rows);
  })
})

// api route that pulls the entire database, but only returns the SEC column.
app.get("/api/filter/:id", (req, res, next) => {
  let sql = `SELECT DISTINCT ${req.params.id} FROM data`;
  // let params = [req.params.id];
  db.all(sql, [], (err, row) => {
    if (err) {
      throw err;
    }
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.json(row);
  })
})

// api route that returns rows that match the SEC input.
app.get("/api/sec/:id", (req, res, next) => {
  let sql = "SELECT * FROM data WHERE SEC LIKE ?";
  let params = [req.params.id];
  db.all(sql, params, (err, row) => {
    if (err) {
      throw err;
    }
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    res.json(row);
  })
})

// tell the server to listen on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
