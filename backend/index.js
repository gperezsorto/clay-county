let express = require('express');
let db = require('./database.js');
let app = express();

const PORT = 3000;

app.get("/api/lots", (req, res, next) => {
  let sql = "SELECT * FROM data";
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
