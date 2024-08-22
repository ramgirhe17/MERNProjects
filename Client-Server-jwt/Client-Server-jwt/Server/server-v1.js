const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const app = express();
const connectionString = {
  host: "localhost",
  port: 3306,
  database: "sunbeam",
  user: "root",
  password: "sham2114",
};

//We will get data in request.body in JSON format due to below
//middleware. It means request - stream will be converetd into
//request.body in below middle ware call.
// app.use(
//   cors({
//     origin: "http://127.0.0.1:5500",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"], // Add other custom headers if needed
//     optionsSuccessStatus: 200,
//   })
// );

app.use(express.json());
// app.use((req, resp, next) => {
//   resp.setHeader("Access-Control-Allow-Origin", "*");
//   resp.setHeader("Access-Control-Allow-Methods", "*");
//   resp.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

app.use(cors());
//http://127.0.0.1:9999/users
app.get("/users", (request, response) => {
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

app.get("/users/SortedBySal", (request, response) => {
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

app.post("/users", (request, response) => {
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

app.put("/users/:empno", (request, response) => {
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

app.delete("/users/:empno", (request, response) => {
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

app.get("/users/:empno", (request, response) => {
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
app.post("/users/AllNameAndDeptno", (request, response) => {
  var connection = mysql.createConnection(connectionString);
  connection.connect();

  console.log(request.body);
  var queryText = `select ename,dname from emp , dept  where emp.deptno=dept.deptno and  dept.deptno=${request.body.deptno}`;

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

app.listen(9999, () => {
  console.log("server started..");
});
