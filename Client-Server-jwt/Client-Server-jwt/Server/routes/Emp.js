const mysql = require("mysql");
const express = require("express");
const config = require("config");

const app = express.Router();

const connectionString = {
  host: config.get("host"),
  port: config.get("sqlport"),
  database: config.get("database"),
  user: config.get("username"),
  password: config.get("password"),
};

app.get("/", (request, response) => {
  var connection = mysql.createConnection(connectionString);
  connection.connect();

  var queryText = "select * from Emp";

  connection.query(queryText, (err, result) => {
    if (err == null) {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(result));
      connection.end();
      response.end();
    } else {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(err));
      connection.end();
      response.end();
    }
  });
});

app.get("/SortedBySal", (request, response) => {
  var connection = mysql.createConnection(connectionString);
  connection.connect();

  var queryText = "select * from Emp order by sal desc";

  connection.query(queryText, (err, result) => {
    if (err == null) {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(result));
      connection.end();
      response.end();
    } else {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(err));
      connection.end();
      response.end();
    }
  });
});

app.get("/SortedByEmpNO", (request, response) => {
  var connection = mysql.createConnection(connectionString);
  connection.connect();

  var queryText = "select * from Emp order by empno";

  connection.query(queryText, (err, result) => {
    if (err == null) {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(result));
      connection.end();
      response.end();
    } else {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(err));
      connection.end();
      response.end();
    }
  });
});

app.get("/:empno", (request, response) => {
  var connection = mysql.createConnection(connectionString);
  connection.connect();

  console.log(request.params);
  var queryText = `select * from emp where empno =${request.params.empno}`;

  console.log(queryText);

  connection.query(queryText, (err, result) => {
    if (err == null) {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(result));
      connection.end();
      response.end();
    } else {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(err));
      connection.end();
      response.end();
    }
  });
});

app.get("/AllNameAndDeptno/:deptno", (request, response) => {
  var connection = mysql.createConnection(connectionString);
  connection.connect();

  console.log(request.body);
  var queryText = `select ename,dname from emp , dept  where emp.deptno=dept.deptno and  dept.deptno=${request.params.deptno}`;

  console.log(queryText);

  connection.query(queryText, (err, result) => {
    if (err == null) {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(result));
      connection.end();
      response.end();
    } else {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(err));
      connection.end();
      response.end();
    }
  });
});

app.post("/", (request, response) => {
  var connection = mysql.createConnection(connectionString);
  connection.connect();

  console.log(request.body);
  var queryText = `insert into Emp values(${request.body.empno}, '${request.body.ename}', 
    '${request.body.job}', ${request.body.mgr}, '${request.body.hire}', ${request.body.sal}, 
    ${request.body.comm}, ${request.body.deptno})`;

  console.log(queryText);

  connection.query(queryText, (err, result) => {
    if (err == null) {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(result));
      connection.end();
      response.end();
    } else {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(err));
      connection.end();
      response.end();
    }
  });
});

app.put("/:empno", (request, response) => {
  var connection = mysql.createConnection(connectionString);
  connection.connect();
  var queryText = `UPDATE Emp SET ename = '${request.body.ename}',job = '${request.body.job}',
    mgr = '${request.body.mgr}',
    hire = '${request.body.hire}',
    sal = '${request.body.sal}',
    comm = '${request.body.comm}',
    deptno = '${request.body.deptno}' WHERE empno = ${request.params.empno}`;

  connection.query(queryText, (err, result) => {
    if (err == null) {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(result));
      connection.end();
      response.end();
    } else {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(err));
      connection.end();
      response.end();
    }
  });
});

app.delete("/:empno", (request, response) => {
  var connection = mysql.createConnection(connectionString);
  connection.connect();

  console.log(request.params);
  var queryText = `delete from emp where empno =${request.params.empno}`;

  console.log(queryText);

  connection.query(queryText, (err, result) => {
    if (err == null) {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(result));
      connection.end();
      response.end();
    } else {
      response.setHeader("Content-Type", "application/json");
      response.write(JSON.stringify(err));
      connection.end();
      response.end();
    }
  });
});

module.exports = app;
