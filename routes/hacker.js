var express = require("express");
var router = express.Router();
var connection = require("../lib/db");

router.get("/byid/:id", function (req, res, next) {
  const id = req.params["id"];
  const query = {
    text: 'SELECT * FROM user_hackers where id = $1',
    values: [id],
  }
  connection.query(query, (err, r) => {
    if (err)  {
      res.send({ status: 0, message: err.stack });
    } else {
      res.send(r.rows[0]);
    }
  });
});

router.get("/all", function (req, res, next) {
  // console.log(connection)
  const query = {
    text: "SELECT * FROM user_hackers",
  }
  connection.query(query, (err, r) => {
    if (err) {
      res.send({ status: 0, message: err.stack });
    } else {
      res.send(r.rows);
    }
  });
});

router.get("/ranks", function (req, res, next) {

  const query = {
    text:  "SELECT username, name, (solutions_submitted - challenges_solved) as s FROM user_hackers where challenges_solved>10 order by s desc limit 3",
  }
  connection.query(
    query,
    function (err, r) {
      if (err) {
        res.send({ status: 0, message: err.stack });
      } else {
        res.send(r.rows);
      }
    }
  );
});

module.exports = router;
