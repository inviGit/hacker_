var express = require("express");
var router = express.Router();
var connection = require("../lib/db");

router.get("/byid/:id", function (req, res, next) {
    const id = req.params['id']
    connection.query("SELECT * FROM user_hackers where id = ?", [id], function (err, rows) {
      if (err) throw err;
      // if user not found
      if (rows.length <= 0) {
        res.send({ message: "failed" });
      } else {
        res.send(rows[0]);
      }
    });
  });

router.get("/all", function (req, res, next) {
  connection.query("SELECT * FROM user_hackers", [], function (err, rows) {
    if (err) throw err;
    // if user not found
    if (rows.length <= 0) {
      res.send({ message: "failed" });
    } else {
      res.send(rows);
    }
  });
});

router.get("/ranks", function (req, res, next) {
  connection.query("SELECT username, name, (solutions_submitted - challenges_solved) as s FROM user_hackers where challenges_solved>10 order by s desc limit 3", [], function (err, rows) {
    if (err) throw err;
    // if user not found
    if (rows.length <= 0) {
      res.send({ message: "failed to get details" });
    } else {
      res.send(rows);
    }
  });
});

module.exports = router;
