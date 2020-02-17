const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get("/add", (request, response) => {
  response.render("user_add", {
    title: "Add a new User!"
  });
});

connection.connect(err => {
  if (err) throw err;
  console.log("done");
});

// insert form

app.post("/save", (request, response) => {
  let data = {
    name: request.body.name,
    email: request.body.email,
    phone: request.body.phone
  };
  let sql = "INSERT INTO users SET ?";
  let query = connection.query(sql, data, (error, results) => {
    if (error) throw error;
    response.redirect("/");
  });
});

// edit
app.get("/edit/:id", (request, response) => {
  const userId = request.params.id;
  let sql = `SELECT * FROM users where id = ${userId}`;
  let query = connection.query(sql, (error, result) => {
    if (error) throw error;
    response.render("user_edit", { title: "Edit user", user: result[0] });
  });
});

//update

app.post("/update", (request, response) => {
  const userId = request.body.id;
  let sql = `UPDATE users SET name= '${request.body.name}',email = '${request.body.email}', phone = '${request.body.phone}'  where id = ${userId}`;
  let query = connection.query(sql, (error, results) => {
    if (error) throw error;
    response.redirect("/");
  });
});

// delete

app.get("/delete/:id", (request, response) => {
  const userId = request.params.id;
  let sql = `DELETE FROM users where id = ${userId}`;
  let query = connection.query(sql, (error, result) => {
    if (error) throw error;
    response.redirect("/");
  });
});

//set view files
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server started");
});
