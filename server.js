const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  if (!req.client.authorized) {
    return res.status(401).send('Unauthorized: Client cert required');
  }

  console.log("🚀 Form Data Received:", req.body);
  res.send("✅ Data submitted to backend successfully!");
});

const options = {
  key: fs.readFileSync('certs/server.key'),
  cert: fs.readFileSync('certs/server.crt'),
  ca: fs.readFileSync('certs/ca.crt'),
  requestCert: true,
  rejectUnauthorized: true
};

https.createServer(options, app).listen(8443, () => {
  console.log("🔐 mTLS API running at https://localhost:8443");
});
