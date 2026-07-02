// INTENTIONALLY VULNERABLE demo app for the aws-code-security-scanner.
// Contains a planted SQL-injection flaw so the SAST scanner (Semgrep) has a
// real vulnerability to detect.

const express = require("express");
const mysql = require("mysql");
const config = require("./config");

const app = express();
const db = mysql.createConnection(config.database);

// PLANTED VULN #2 (Semgrep): SQL injection via string concatenation.
app.get("/user", (req, res) => {
  const userId = req.query.id;
  const query = "SELECT * FROM users WHERE id = '" + userId + "'"; // injectable
  db.query(query, (err, results) => {
    if (err) return res.status(500).send("db error");
    res.json(results);
  });
});

// PLANTED VULN #3 (Semgrep): command injection via child_process with user input.
app.get("/ping", (req, res) => {
  const { exec } = require("child_process");
  exec("ping -c 1 " + req.query.host, (err, stdout) => { // injectable
    res.send(stdout || "error");
  });
});

app.listen(3000, () => console.log("vuln-demo listening on :3000"));
