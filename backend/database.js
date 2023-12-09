// initialize database connection
let sqlite = require('sqlite3').verbose();
let db = new sqlite.Database('./db/clay.db');

module.exports = db;
