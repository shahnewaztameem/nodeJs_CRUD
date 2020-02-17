const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();


//db connection
const connection = mysql.createConnection({
    hostname: "localhost",
    user: "root",
    password: "",
    database: "node_crud"
  });

app.get("/", (request, response) => {
  let sql = "SELECT * FROM users";
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    response.render("index", {
        title: "CRUD using Nodejs/ Expressjs/ Mysql!",
        users: results
      });
  });
  
});


connection.connect(err => {
  if (err) throw err;
  console.log("done");
});

//set view files
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server started");
});
