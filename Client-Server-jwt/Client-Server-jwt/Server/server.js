const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const appForEmp = require("./routes/Emp");

const config = require("config");
const PORT = config.get("portno");
const encryptionKey = config.get("encryptionKey");

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  var reply = { message: "" };

  // console.log(req.headers.authorization);

  if (req.url.includes("users")) {
    if (req.headers.authorization !== undefined) {
      var token = req.headers.authorization.split(" ")[1];
      // console.log(token);
      jwt.verify(token, encryptionKey, (err, decoded) => {
        if (err) {
          reply.message = "invalid token";
          res.setHeader("Content-Type", "application/json");
          res.status(401).send(reply); // send reply with status code
        } else if (decoded.code === "sham2114") {
          next(); // continue to the next middleware
        } else {
          reply.message = "unauthorized";
          res.setHeader("Content-Type", "application/json");
          res.status(403).send(reply); // unauthorized response
        }
      });
    } else {
      reply.message = "Auth Token is required!";
      res.setHeader("Content-Type", "application/json");
      res.status(401).send(reply); // use res to send response with status code
    }
  } else {
    var token = jwt.sign(
      {
        code: "sham2114",
      },
      encryptionKey
    );
    console.log(token);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ token, isValid: true }); // send generated token
  }
});

app.use("/users", appForEmp);

app.listen(PORT, () => {
  console.log("server started..");
});
