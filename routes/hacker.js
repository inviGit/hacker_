var express = require("express");
var router = express.Router();
var connection = require("../lib/db");

router.get("/byid/:id", function (req, res, next) {
  const id = req.params["id"];
  const query = "SELECT * FROM user_hackers where id = $1";
  const values = [id];
  connection.query(query, values, (err, rows) => {
    if (err)  {
      res.send({ status: 0, message: err });
    } else {
      res.send(rows[0]);
    }
  });
});

router.get("/all", function (req, res, next) {
  connection.query("SELECT * FROM user_hackers", (err, rows) => {
    if (err) {
      res.send({ status: 0, message: err });
      console.log(err.stack);
    } else {
      res.send(rows);
    }
  });
});

router.get("/ranks", function (req, res, next) {
  connection.query(
    "SELECT username, name, (solutions_submitted - challenges_solved) as s FROM user_hackers where challenges_solved>10 order by s desc limit 3",
    function (err, rows) {
      if (err) {
        res.send({ status: 0, message: err });
      } else {
        res.send(rows);
      }
    }
  );
});

module.exports = router;
