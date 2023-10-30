const mysql = require("mysql2");
const { Connection } = require("mysql2/typings/mysql/lib/Connection");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "110729qq",
  database: "practice",
});
connection.query("select * from customers", function (err, results, fields) {
  console.log(results);
  console.log("====================================");
  console.log(fields.map((item) => item.name));
  console.log("====================================");
});
connection.execute(
  "insert into customers (name) values (?)",
  ["cy"],
  (err, results, fields) => {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
  }
);
