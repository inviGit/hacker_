var express = require("express");
var router = express.Router();
var connection = require("../lib/db");

//authenticate user
router.post("/login", function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  connection.query(
    "SELECT * FROM user_users where email = $1 and password = $2",
    [email, password],
    function (err, rows) {
      if (err) throw err;
      // if user not found
      if (rows.length <= 0) {
        res.send({status:0, message: "failed" });
      } else {
        res.send({ status:1, message: "success", role:  rows[0].role});
        req.session.loggedin = true;
        req.session.name = email;
      }
    }
  );
});

// user registration
router.post("/register", function (req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let role = "user";
  var user = {
    name: name,
    email: email,
    password: password,
    role: role,
  };
  connection.query("INSERT INTO user_users SET $1", user, function (err, result) {
    if (err) {
      res.send({ message: "error", data: err });
    } else {
      res.send({ message: "success, You have successfully signup!" });
    }
  });
});

// Logout user
router.get("/logout", function (req, res) {
  req.session.destroy();
  res.send("success");
});

module.exports = router;
