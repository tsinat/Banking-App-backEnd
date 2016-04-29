'use strict';

var mysql = require('mysql');

var db = mysql.createConnection(process.env.JAWSDB_URL || {
  host     : 'localhost',
  user     : 'root',
  password : 'cheru',
  database : 'testdb'
});

db.connect();


db.query(`create table if not exists balances (id int primary key auto_increment, date text, description text, debit int, credit int)`);
module.exports = db;
